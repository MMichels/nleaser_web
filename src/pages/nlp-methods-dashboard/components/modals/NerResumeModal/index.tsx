import React, { Component } from 'react';

import { NerResumeService } from '../../../../../services/ner_resume.service';

import nlpModalStyles from "../nlpModalStyles.module.scss";
import modalStyles from "../../../../../styles/modalStyles.module.scss";

import { DataFileType } from '../../../../../types/datafiles.types';
import { NerResumePaginationType, NerResumeType, EntityType } from '../../../../../types/ner.types';
import { TasksType } from '../../../../../types/tasks.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinnerComponent } from '../../../../../components/loading';
import { TaskInfoComponent } from '../../../../../components/task-info';
import Swal from 'sweetalert2';
import { PaginatedList } from 'react-paginated-list';
import { ptBR } from 'date-fns/locale';
import format from 'date-fns/format';


interface INerResumeModalProps {
    datafile: DataFileType;
}

interface INerResumeModalState {
    error?: string;
    loading: boolean;
    ner_resume?: NerResumeType;
    tasks?: TasksType;
    page: number;
    pagination: NerResumePaginationType;    
}


export class NerResumeModal extends Component<INerResumeModalProps, INerResumeModalState> {
    nerResumeService: NerResumeService;
    monitoringTimeout?: NodeJS.Timeout;
    
    constructor(props){
        super(props);
        this.nerResumeService = new NerResumeService();
        this.state = {
            error: null,
            loading: false, 
            ner_resume: null,
            tasks: null,
            page: 1,
            pagination: new NerResumePaginationType()
        };

        this.getTasks = this.getTasks.bind(this);
        this.getNerResume = this.getNerResume.bind(this);
        this.monitoringNerResumeProcessing = this.monitoringNerResumeProcessing.bind(this);

        this.changePage = this.changePage.bind(this);
        this.changeOrdination = this.changeOrdination.bind(this);
        
        this.handleOnClickNovo = this.handleOnClickNovo.bind(this);
        this.handleOnClickExcluir = this.handleOnClickExcluir.bind(this);

    }

    componentDidMount() {
        this.getNerResume(this.state.page);
        this.monitoringNerResumeProcessing();
    }

    componentWillUnmount() {
        if(this.monitoringTimeout)
            clearTimeout(this.monitoringTimeout);
    }

    async getTasks() {
        await this.nerResumeService.getTasks(this.props.datafile.id).then((response) => {
            this.setState({tasks: response});
        }).catch((err) => {
            if(!this.state.error)
                this.setState({error: err.error});
        });
    }

    async getNerResume(page: number) {
        this.setState({loading: true});
        const pagination = this.state.pagination;
        pagination.skip = (page - 1) * (pagination.limit);

        this.nerResumeService.get(this.props.datafile.id, pagination).then(response => {
            const ner_resume = response;    

            const emptyArray = new Array<any>();
            while(emptyArray.length < pagination.skip)
                emptyArray.push({});

            ner_resume.extracted_entities = emptyArray.concat(ner_resume.extracted_entities);
            while(ner_resume.extracted_entities.length < ner_resume.total)
                ner_resume.extracted_entities.push({"content": null, "count": null, "entity": null});

            this.setState({ner_resume, pagination, error: null});
        }).catch(err => {
            this.setState({error: err.error, ner_resume: null});
        }).finally(() => this.setState({loading: false}));
        
    }

    monitoringNerResumeProcessing() {
        this.getTasks().then(() => {
            if(this.state.tasks && 
                ['queued', 'in_progress'].includes(this.state.tasks.tasks[0].status)
            ){
                this.monitoringTimeout = setTimeout(this.monitoringNerResumeProcessing, 1000);
            }else if(this.state.tasks && this.state.tasks.tasks[0].status === 'success'){
                this.getNerResume(this.state.page);
            }
        })

    }

    changePage(items: Array<any>, currentPage: number) {
        this.setState({page: currentPage});
        this.getNerResume(currentPage);
    }

    changeOrdination(orderBy: "content" | "count" | "entity", orderAscending: 1 | 0) {
        const pagination = this.state.pagination;
        pagination.orderBy = orderBy;
        pagination.orderAscending = orderAscending;

        this.setState({pagination});
        this.changePage([], 1);
    }

    labelToEntitie(label) {
        var labelEntitieMapping = {
            "ORG": "Organização",
            "LOC": "Local",
            "PER": "Nome",
            "MISC": "Outros",
            "CARDINAL": "Numero",
            "DATE": "Data",
            "EVENT": "Eventos",
            "FAC": "Construções",
            "GPE": "Endereço",
            "LANGUAGE": "Idioma",
            "LAW": "Documento",
            "MONEY": "Moeda", 
            "NORP": "Identidade Cultural",
            "ORDINAL": "Numeral Ordenado",
            "PERCENT": "Porcentagem",
            "PERSON": "Pessoa",
            "PRODUCT": "Produtos",
            "QUANTITY": "Medida",
            "TIME": "Horário",
            "WORK_OF_ART": "Obra de arte"
        }
        return labelEntitieMapping[label] || "Outros";
    }

    labelToTip(label) {
        var labelEntitieMapping = {
            "ORG": "Companhias, agencias, instituições, etc.",
            "LOC": "Localidade não geopolítica, montanhas, lagos, etc.",
            "PER": "Nome pessoal ou sobrenome",
            "MISC": "Outras entidades, ex: Eventos, nacionalidades, produtos.",
            "CARDINAL": "Numero",
            "DATE": "Dadas ou períodos, absolutos ou relativos",
            "EVENT": "Eventos climáticos, batalhas, eventos esportivos",
            "FAC": "Construções, aeroportos, rodovias, pontes",
            "GPE": "Países, estados e cidades",
            "LANGUAGE": "Idioma",
            "LAW": "Documentos oficiais relacionados a leis",
            "MONEY": "Valores monetários", 
            "NORP": "Nacionalidade, religião ou grupo politico",
            "ORDINAL": "Primeiro, segundo, etc.",
            "PERCENT": "Porcentagem incluindo '%'",
            "PERSON": "Pessoas e personagens",
            "PRODUCT": "Objetos, veículos, alimentos",
            "QUANTITY": "Medida física, como peso ou distância",
            "TIME": "Períodos de tempo inferiores a 1 dia",
            "WORK_OF_ART": "Produções artísticas, pinturas, esculturas, musica, etc."
        }
        return labelEntitieMapping[label] || "Outros";

    }

    async handleOnClickNovo(e: React.MouseEvent) {
        e.preventDefault();
        Swal.fire({
          title: "Extrair entidades!",
          html: `
            <p>
                Ao confirmar essa operação, a sua solicitação será colocada na nossa fila de processamento!
                <br />
                Assim que a extração de NER for concluída, ela ficará disponível.
            </p>
          `,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Extrair NER",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => this.nerResumeService.create(this.props.datafile.id)
            .then(response => response)
            .catch(err => err)
        }).then((response) => {
            if(response.value){
                if(response.value.status === 'success'){                
                    this.monitoringNerResumeProcessing();
                } else 
                {
                    Swal.fire(
                        "Erro ao solicitar extração de NER",
                        response.value.error,
                        'error'
                    );
                }
            }
        }); 
    }

    async handleOnClickExcluir(e: React.MouseEvent){
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
          title: "Excluir Ner",
          html: `
            <p>
                Ao confirmar essa operação, a extração de NER sera excluída!
                <br />
                Você poderá solicitar outro a qualquer momento.
            </p>
          `,
          icon: "warning",
          showConfirmButton: true,
          confirmButtonText: "Excluir wordcloud",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => this.nerResumeService.delete(this.props.datafile.id)
            .then(response => response)
            .catch(err => err)
        }).then((response) => {
            this.setState({loading: false});
            if(response.value){
                if(response.value.status !== 'success'){
                    Swal.fire(
                        "Erro ao excluir extração de NER",
                        response.value.error,
                        'error'
                    )
                }
                this.setState({ner_resume: null, page: 1});
                this.getNerResume(1);
            }
        });    

    }

    render() {
        if(this.state.ner_resume)
            var formatedCreatedAtDate = format(new Date(this.state.ner_resume.created_at), 'dd MMMM yyyy - HH:mm', {locale: ptBR});    


        return (
            <div className={nlpModalStyles.container}>

                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        NER - Arquivo: {this.props.datafile.name}
                    </p>
                    <button className={modalStyles.closeModalButton}>
                    </button>
                </div>
                <p className={modalStyles.modalDescription}>
                    Identifica quais são as entidades, ou seja, nomes de pessoas, de lugares, empresas, dentre outros, que aparecem com maior frequência no conjunto de textos!
                </p>
                <hr />

                <div className={nlpModalStyles.actions}>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Novo</p>                      
                    </button>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.deleteButton} onClick={this.handleOnClickExcluir}
                        disabled={!this.state.ner_resume}
                    >
                        <p>Excluir</p>                     
                    </button>                    
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
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Identificando entidades" />
                }

                {
                    // Se estiver tudo ok, exibe a lista de Entidades extraídas                    
                    (
                        (!this.state.error && !this.state.loading) &&
                        (this.state.tasks && 
                            this.state.tasks.tasks[0].status === "success") &&
                        this.state.ner_resume
                    ) && 
                    <div className={nlpModalStyles.nlpResult}>
                        <PaginatedList
                            list={this.state.ner_resume.extracted_entities}
                            itemsPerPage={this.state.pagination.limit}
                            currentPage={this.state.page}
                            isLoading={this.state.loading}
                            paginatedListContainerClass={nlpModalStyles.tableListResult}
                            controlClass={nlpModalStyles.pagination}
                            controlItemClass={nlpModalStyles.paginationItem}
                            onPageChange={this.changePage}
                            loadingItem={LoadingSpinnerComponent}
                            renderList = {(list) => (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>
                                                    <p>NER</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'content' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdination("content", 0)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'content' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown}  onClick={() => this.changeOrdination("content", 1)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'content' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSort}  onClick={() => this.changeOrdination("content", 0)}/>
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div>
                                                    <p>Ocorrências</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'count' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdination("count", 0)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'count' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown}  onClick={() => this.changeOrdination("count", 1)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'count' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSort}  onClick={() => this.changeOrdination("count", 0)}/>
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div>
                                                    <p>Tipo</p>
                                                    {
                                                        this.state.pagination.orderBy !== 'entity' &&
                                                        <FontAwesomeIcon icon={faSort} onClick={() => this.changeOrdination("entity", 0)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'entity' && this.state.pagination.orderAscending === 0 && 
                                                        <FontAwesomeIcon icon={faSortDown}  onClick={() => this.changeOrdination("entity", 1)}/>
                                                    }
                                                    {
                                                        this.state.pagination.orderBy === 'entity' && this.state.pagination.orderAscending === 1 && 
                                                        <FontAwesomeIcon icon={faSort}  onClick={() => this.changeOrdination("entity", 0)}/>
                                                    }
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((entity, idx) => {
                                                    return (
                                                    <tr key={idx}>
                                                        <td className={nlpModalStyles.content}>
                                                            <p>{entity.content}</p>
                                                        </td>
                                                        <td className={nlpModalStyles.count}>
                                                            <p>{entity.count}</p>
                                                        </td>
                                                        <td className={nlpModalStyles.content} title={this.labelToTip(entity.entity)}>                                                            
                                                            <p>{this.labelToEntitie(entity.entity)}</p>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            )}
                        />
                        <p className={nlpModalStyles.createdDate}>
                            {formatedCreatedAtDate}
                        </p>
                    </div>
                }

            </div>
        );
    }
}

export default NerResumeModal;