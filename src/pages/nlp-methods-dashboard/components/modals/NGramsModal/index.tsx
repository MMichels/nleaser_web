import React, { Component } from "react";

import Swal from "sweetalert2";
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import styles from "./styles.module.scss";
import modalStyles from "../../../../../styles/modalStyles.module.scss";

import { NGramService } from "../../../../../services/ngrams.service";
import { DataFileType } from "../../../../../types/datafiles.types";
import { NGramsType } from "../../../../../types/ngrams.types";
import { TasksType } from "../../../../../types/tasks.types";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinnerComponent } from "../../../../../components/loading";
import { TaskInfoComponent } from "../../../../../components/task-info";


interface INGramModalProps {
    datafile: DataFileType
}

interface INGramModalState {
    error?: string;
    loading: boolean;
    ngrams?: NGramsType;
    tasks?: TasksType;
}

export class NGramsModal extends Component<INGramModalProps, INGramModalState> {
    ngramsService: NGramService;

    constructor(props) {
        super(props);
        this.ngramsService = new NGramService();
        this.state = {
            error: null,
            loading: false,
            ngrams: null,
            tasks: null
        }

        this.getTasks = this.getTasks.bind(this);
        this.getNgrams = this.getNgrams.bind(this);
        this.handleOnClickNovo = this.handleOnClickNovo.bind(this);
        this.handleOnClickExcluir = this.handleOnClickExcluir.bind(this);
    }

    async componentDidMount() {
        this.setState({loading: true});

        this.getNgrams();
        this.getTasks();

        this.setState({loading: false});
    }

    async getTasks() {
        await this.ngramsService.getTasks(this.props.datafile.id).then((response) => {
            this.setState({tasks : response});
        }).catch((err) => {
            if(!this.state.error)
                this.setState({error: err.error});
        });

    }

    async getNgrams() {
        await this.ngramsService.get(this.props.datafile.id).then((response) => {
            this.setState({ngrams : response, error: null});
        }).catch((err) => {
            this.setState({error: err.error});
        })

    }

    async monitoringNGramsProcessing() {
        throw new Error("Method not implemented.");
    }

    async handleOnClickNovo(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
            title: "Extrair NGrams!",
            html: `
                <p>
                    Selecione o numero de Grams (palavras consecutivas) que deseja analisar.                    
                    <br />
                    Ao confirmar a operação ela sera colocada na fila de processamento.
                    <br />
                    Assim que a extração de Ngrams estiver pronta, ele ficará disponível para visualização.
                </p>                
            `,
            input: 'range',
            inputLabel: 'Numero de palavras',
            inputAttributes: {
                'min': '1',
                'max': '4',
                'step': '1'
            },
            icon: "info",
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: "Extrair NGrams",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            preConfirm: () => this.ngramsService.create(this.props.datafile.id)
        }).then((response) => {
            if(response.value.status === 'success')
            {
                this.monitoringNGramsProcessing();
            }
            else
            {
                Swal.fire(
                    "Erro ao solicitar NGrams",
                    response.value.error,
                    'error'
                );
            }
        });
        
        this.setState({loading: false});
    }

    async handleOnClickExcluir(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
            title: "Excluir NGrams",
            html: `
                <p>
                    Ao confirmar essa operação, o NGram atual sera excluído!
                    <br />
                    Você poderá solicitar outro a qualquer momento.
                </p>                
            `,
            icon: 'warning',
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: "Extrair NGrams",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            preConfirm: () => this.ngramsService.delete(this.props.datafile.id)
        }).then((response) => {
            if(response.value.status === 'success')
            {
                this.setState({ngrams: null});
            }
            else
            {
                Swal.fire(
                    "Erro ao excluir NGram",
                    response.value.error,
                    'error'
                );
            }
        });       
        this.setState({loading: false});
    }

    render() {
        if(this.state.ngrams){
            var formatedCreatedAtDate = format(new Date(this.state.ngrams.created_at),'dd MMMM yyyy - HH:MM', {locale: ptBR});

            var ngrams = this.state.ngrams.content.map((ngram) => 
                <tr>
                    <td>
                        {ngram.word}
                    </td>
                    <td>
                        {ngram.count}
                    </td>
                </tr>                
            )
        }


        return (
            <div className={styles.container}>
                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        NGrams - Arquivo: {this.props.datafile.name}
                    </p>
                    <button className={modalStyles.closeModalButton}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
                <p className={modalStyles.modalDescription}>                    
                    Tem como objetivo analisar quais palavras que ocorrem lado a lado com mais frequência dentro do seu conjunto de textos!
                    <br />
                    Por exemplo, uma sequência de duas palavras como “por favor” ou “bom dia”, ou 3 palavras como, "possui ótimo atendimento".
                </p>
                <hr />
                <div className={styles.actions}>
                    <button className={styles.actionButton + ' ' + styles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Novo</p>
                        <FontAwesomeIcon icon={faPlusCircle} />                        
                    </button>
                    <button className={styles.actionButton + ' ' + styles.deleteButton} onClick={this.handleOnClickExcluir}>
                        <p>Excluir</p>
                        <FontAwesomeIcon icon={faTimesCircle} />                        
                    </button>
                </div>
                {
                    this.state.error && 
                    <p className={"error " + styles.error}>{this.state.error}</p>
                }
                {
                    this.state.loading && <LoadingSpinnerComponent />
                }
                {
                    (
                        this.state.tasks && 
                        this.state.tasks.tasks[0].status !== "success"
                    ) &&
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Extraindo NGrams" />
                }
                {
                    (
                        (!this.state.error) &&
                        (!this.state.loading) &&
                        (this.state.tasks) &&
                        (!["queued", "in_progress"].includes(this.state.tasks.tasks[0].status)) &&
                        this.state.ngrams
                    ) &&
                    <div className={styles.NGramsResult}>
                        <p>
                            Resultado da ultima extração com {this.state.ngrams.N} palavras (Grams)
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Palavra(s)
                                    </th>
                                    <th>
                                        Quantidade
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ngrams}
                            </tbody>
                        </table>
                    </div>
                }
                
            </div>
        )
    }



}