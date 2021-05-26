import React, { Component } from "react";

import Swal from "sweetalert2";
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import nlpModalStyles from "../nlpModalStyles.module.scss";
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
    monitoringTimeout?: NodeJS.Timeout;

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
        this.monitoringNGramsProcessing = this.monitoringNGramsProcessing.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});

        this.getNgrams();
        this.monitoringTimeout = setTimeout(this.monitoringNGramsProcessing, 1000);

        this.setState({loading: false});
    }

    componentWillUnmount() {
        if(this.monitoringTimeout)
            clearTimeout(this.monitoringTimeout);
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
        await this.getTasks();

        if(
            ['queued', 'in_progress'].includes(this.state.tasks.tasks[0].status)
        )
        {
            this.monitoringTimeout = setTimeout(this.monitoringNGramsProcessing, 1000);
        }
        else if(this.state.tasks.tasks[0].status === 'success')
        {
            this.getNgrams();
        }
    }

    async handleOnClickNovo(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
            title: "Extrair NGrams!",
            html: `
                <p>
                    Selecione o numero de palavras consecutivas para analisar
                    <br />
                    <br />
                    Assim que a extração de Ngrams estiver pronta, ele ficará disponível para visualização.
                </p>                
            `,
            input: 'select',
            inputPlaceholder: 'Numero de palavras',
            inputOptions: {
                1: '1 Palavra',
                2: '2 Palavras (Bi-Gram)',
                3: '3 Palavras (Tri-Gram)',
                4: '4 Palavras (Quad-Gram)',
            },
            icon: "info",
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: "Extrair NGrams",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            preConfirm: (ngrams: number) => {
                return this.ngramsService.create(this.props.datafile.id, ngrams).then(response => response).catch(err => err);
            }
        }).then((response) => {
            if(response.value) {
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
            preConfirm: () => this.ngramsService.delete(this.props.datafile.id).then(response => response).catch(err => err)
        }).then((response) => {
            if(response.value){
                if(response.value.status === 'success')
                {
                    this.setState({ngrams: null});
                    this.getNgrams();
                }
                else
                {
                    Swal.fire(
                        "Erro ao excluir NGram",
                        response.value.error,
                        'error'
                    );
                }
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
            <div className={nlpModalStyles.container}>
                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        NGrams - Arquivo: {this.props.datafile.name}
                    </p>
                    <button className={modalStyles.closeModalButton}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
                <p className={modalStyles.modalDescription}>                    
                    Tem como objetivo analisar quais palavras que ocorrem lado a lado com mais frequência dentro do seu conjunto de textos! <br />
                    Por exemplo, uma sequência de duas palavras (Bi-Gram) como “por favor” ou “bom dia”, ou 3 palavras (Tri-Gram) como, "possui ótimo atendimento".
                </p>
                <hr />
                <div className={nlpModalStyles.actions}>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Novo</p>
                        <FontAwesomeIcon icon={faPlusCircle} />                        
                    </button>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.deleteButton} onClick={this.handleOnClickExcluir}
                        disabled={!this.state.ngrams}
                    >
                        <p>Excluir</p>
                        <FontAwesomeIcon icon={faTimesCircle} />                        
                    </button>
                </div>
                {
                    this.state.error && 
                    <p className={"error " + nlpModalStyles.error}>{this.state.error}</p>
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
                    <div className={nlpModalStyles.NGramsResult}>
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