import React, { Component } from "react";

import Swal from "sweetalert2";
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import nlpModalStyles from "../nlpModalStyles.module.scss";
import modalStyles from "../../../../../styles/modalStyles.module.scss";

import { NGramService } from "../../../../../services/ngrams.service";
import { DataFileType } from "../../../../../types/datafiles.types";
import { NGramsPaginationType, NGramsType, NGramType } from "../../../../../types/ngrams.types";
import { TasksType } from "../../../../../types/tasks.types";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinnerComponent } from "../../../../../components/loading";
import { TaskInfoComponent } from "../../../../../components/task-info";
import { PaginatedList } from "react-paginated-list";


interface INGramModalProps {
    datafile: DataFileType;
}

interface INGramModalState {
    error?: string;
    loading: boolean;
    ngrams?: NGramsType;
    tasks?: TasksType;
    page: number;
    pagination: NGramsPaginationType;
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
            tasks: null,
            page: 1,
            pagination: new NGramsPaginationType()
        }

        this.getTasks = this.getTasks.bind(this);
        this.getNgrams = this.getNgrams.bind(this);
        this.handleOnClickNovo = this.handleOnClickNovo.bind(this);
        this.handleOnClickExcluir = this.handleOnClickExcluir.bind(this);
        this.monitoringNGramsProcessing = this.monitoringNGramsProcessing.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeOrdenation = this.changeOrdenation.bind(this);
    }

    async componentDidMount() {
        this.setState({loading: true});

        this.getNgrams(this.state.page).then(() => {
            this.monitoringNGramsProcessing().then(() => this.setState({loading: false}));
        });
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

    async getNgrams(page: number) {
        const pagination = this.state.pagination;
        pagination.skip = (page - 1) * (pagination.limit);        

        this.ngramsService.get(this.props.datafile.id, pagination).then((response) => {

            const ngrams = response;
            const arrayVazio = new Array<any>();

            while(arrayVazio.length < pagination.skip)
                arrayVazio.push({});

            ngrams.ngrams = arrayVazio.concat(ngrams.ngrams);
            while(ngrams.ngrams.length < ngrams.total)
                ngrams.ngrams.push({'content': null, 'count': null, 'relevance': null});
            
            this.setState({ngrams, pagination, error: null});            
        }).catch((err) => {
            this.setState({error: err.error, ngrams: null});
        });
    }

    async monitoringNGramsProcessing() {
        await this.getTasks();

        if(this.state.tasks && 
            ['queued', 'in_progress'].includes(this.state.tasks.tasks[0].status)
        ){
            this.monitoringTimeout = setTimeout(this.monitoringNGramsProcessing, 1000);
        }
        else if(this.state.tasks && this.state.tasks.tasks[0].status === 'success')
        {
            this.getNgrams(this.state.page);
        }
    }

    changePage(items: NGramType[], currentPage: number) {
        
        this.setState({page: currentPage, loading: true});
        this.getNgrams(currentPage);
        this.setState({loading: false});
    }

    changeOrdenation(order_by: "content" | "count" | "relevance", order_ascending: 1 | 0){
        const pagination = this.state.pagination;
        pagination.orderBy = order_by;
        pagination.orderAscending = order_ascending;

        this.setState({pagination});
        this.changePage(new Array<NGramType>(), 1);
        
    }

    async handleOnClickNovo(e: React.MouseEvent) {
        e.preventDefault();
        Swal.fire({
            title: "Extrair NGrams!",
            html: `
                <p>
                    Selecione o numero de palavras consecutivas para analisar
                    <br />
                    Assim que a extração de Ngrams for concluída, ela ficará disponível.
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
            this.setState({loading: false});
            if(response.value){
                if(response.value.status !== 'success')
                {
                    Swal.fire(
                        "Erro ao excluir NGram",
                        response.value.error,
                        'error'
                    );
                }                
                this.setState({ngrams: null, page: 1});
                this.getNgrams(1);
            }
        });       
        
    }

    render() {
        if(this.state.ngrams)
            var formatedCreatedAtDate = format(new Date(this.state.ngrams.created_at), 'dd MMMM yyyy - HH:mm', {locale: ptBR});    

        return (
            <div className={nlpModalStyles.container}>
                <div className={nlpModalStyles.header}>
                    <h1 className={nlpModalStyles.title}>
                        NGrams
                    </h1>
                </div>
                <p className={modalStyles.modalDescription}>                    
                    Tem como objetivo analisar quais palavras que ocorrem lado a lado com mais frequência dentro do seu conjunto de textos! <br />
                    Por exemplo, uma sequência de duas palavras (Bi-Gram) como “por favor” ou “bom dia”, ou 3 palavras (Tri-Gram) como, "possui ótimo atendimento".
                </p>
                <hr />
                <div className={nlpModalStyles.actions}>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Extrair NGrams</p>                      
                    </button>
                    {
                        this.state.ngrams &&
                        <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.deleteButton} onClick={this.handleOnClickExcluir}
                            disabled={!this.state.ngrams}
                        >
                            <p>Excluir</p>                     
                        </button>
                    }  
                </div>

                {                    
                    // Verifica se ocorreu algum erro nas requisições
                    this.state.error && 
                    <p className={"error " + nlpModalStyles.error}>{this.state.error}</p>
                }

                {
                    // Verifica se esta carregando os dados
                    this.state.loading && <LoadingSpinnerComponent />
                }
                
                {
                    // Acompanha o processamento da task
                    (
                        this.state.tasks && 
                        this.state.tasks.tasks[0].status !== "success"
                    ) &&
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Extraindo NGrams" />
                }
                
                {
                    // Se estiver tudo ok, exibe a lista de NGrams
                    (
                        (!this.state.error && !this.state.loading) &&
                        (this.state.tasks && 
                            this.state.tasks.tasks[0].status === "success") &&
                        this.state.ngrams
                    ) &&
                    <div className={nlpModalStyles.nlpResult}>
                        <PaginatedList 
                            list={this.state.ngrams.ngrams}
                            itemsPerPage={this.state.pagination.limit}
                            currentPage={this.state.page}
                            onPageChange={this.changePage}
                            isLoading={this.state.loading}
                            loadingItem={LoadingSpinnerComponent}
                            paginatedListContainerClass={nlpModalStyles.tableListResult}
                            controlClass={nlpModalStyles.pagination}
                            controlItemClass={nlpModalStyles.paginationItem}
                            renderList={(list) => (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>
                                                    <p>NGram</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'content' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdenation("content", 0)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'content' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown}  onClick={() => this.changeOrdenation("content", 1)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'content' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSortUp}  onClick={() => this.changeOrdenation("content", 0)}/>
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div>
                                                    <p>Ocorrências</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'count' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdenation("count", 0)} />
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'count' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown} onClick={() => this.changeOrdenation("count", 1)} />
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'count' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSortUp} onClick={() => this.changeOrdenation("count", 0)} />
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div>
                                                    <p>Relevância</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'relevance' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdenation("relevance", 0)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'relevance' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown} onClick={() => this.changeOrdenation("relevance", 1)} />
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'relevance' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSortUp} onClick={() => this.changeOrdenation("relevance", 0)} />
                                                    }
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        {
                                            list.map((ngram, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td className={nlpModalStyles.content}>
                                                            <p>{ngram.content}</p>
                                                        </td>                                                        
                                                        <td className={nlpModalStyles.count}>
                                                            <p>{ngram.count}</p>
                                                        </td>                                                       
                                                        <td className={nlpModalStyles.relevance}>
                                                            <p>{Math.floor(ngram.relevance * 100)}%</p>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            )}                        
                        />
                        <p className={nlpModalStyles.createdDate}>
                            Processado em: {formatedCreatedAtDate}
                        </p>
                    </div>
                }
                
            </div>
        )
    }



}