import React, { Component } from 'react';
import Swal from 'sweetalert2';
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import nlpModalStyles from "../nlpModalStyles.module.scss";
import modalStyles from "../../../../../styles/modalStyles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DataFileType } from '../../../../../types/datafiles.types';
import { WordCloudService } from '../../../../../services/wordcloud.service';
import { TasksType } from '../../../../../types/tasks.types';
import { WordCloudType } from '../../../../../types/wordcloud.types';
import { TaskInfoComponent } from '../../../../../components/task-info';
import { LoadingSpinnerComponent } from '../../../../../components/loading';

interface IWordCloudModalProps {
    datafile: DataFileType;
}

interface IWordCloudModalState {
    error?: string;
    loading: boolean;
    wordcloud?: WordCloudType;
    tasks?: TasksType;
}

export class WordCloudModal extends Component<IWordCloudModalProps, IWordCloudModalState> {
    wordcloudService: WordCloudService;
    monitoringTimeout?: NodeJS.Timeout;

    constructor(props){
        super(props);
        this.wordcloudService = new WordCloudService();
        this.state = {
            error: null,
            loading: false, 
            wordcloud: null,
            tasks: null
        }

        this.getTasks = this.getTasks.bind(this);
        this.getWordCloud = this.getWordCloud.bind(this);
        this.handleOnClickNovo = this.handleOnClickNovo.bind(this);
        this.handleOnClickExcluir = this.handleOnClickExcluir.bind(this);
        this.monitoringWordcloudProcessing = this.monitoringWordcloudProcessing.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});

        this.getWordCloud();
        this.monitoringWordcloudProcessing();

        this.setState({loading: false});
    }

    componentWillUnmount() {
        if(this.monitoringTimeout)
            clearTimeout(this.monitoringTimeout);
    }

    async getTasks(){
        await this.wordcloudService.getTasks(this.props.datafile.id).then((response) => {
            this.setState({tasks : response});
        }).catch((err) => {
            if(!this.state.error)
                this.setState({error: err.error});
        });
    }

    async getWordCloud() {
        await this.wordcloudService.get(this.props.datafile.id).then((response) =>{            
            this.setState({wordcloud: response, error: null});            
        }).catch((err) => {
            this.setState({error: err.error});
        });
    }

    async monitoringWordcloudProcessing(){
        await this.getTasks();

        // Se existir alguma tarefa na fila/processando, a cada segundo faz uma consulta na API,
        // Até qe a tarefa seja concluida ou aconteça algum erro
        if(['queued', 'in_progress'].includes(this.state.tasks.tasks[0].status)){
            this.monitoringTimeout = setTimeout(this.monitoringWordcloudProcessing, 1000);
        }else if(this.state.tasks.tasks[0].status === 'success'){
            this.getWordCloud();
        }
    }

    handleOnClickNovo(e: React.MouseEvent){
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
          title: "Gerar WordCloud!",
          html: `
            <p>
                Ao confirmar essa operação, a sua solicitação será colocada na nossa fila de processamento!
                <br />
                Assim que o wordcloud estiver pronto, ele ficará disponível para visualização.
            </p>
          `,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Solicitar wordcloud",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => this.wordcloudService.create(this.props.datafile.id).then(response => response).catch(err => err)
        }).then((response) => {
            if(response.value){
                if(response.value.status === 'success'){                
                    this.monitoringWordcloudProcessing();
                    
                } else 
                {
                    Swal.fire(
                        "Erro ao solicitar WordCloud",
                        response.value.error,
                        'error'
                    );
                }
            }
        });        
        this.setState({loading: false});
    }

    handleOnClickExcluir(e: React.MouseEvent){
        e.preventDefault();
        this.setState({loading: true});
        Swal.fire({
          title: "Excluir wordcloud",
          html: `
            <p>
                Ao confirmar essa operação, o wordcloud sera excluído!
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
          preConfirm: () => this.wordcloudService.delete(this.props.datafile.id).then(response => response).catch(err => err)
        }).then((response) => {
            if(response.value){
                if(response.value.status === 'success'){
                    this.setState({wordcloud: null});
                    this.getWordCloud();
                }else {
                    Swal.fire(
                        "Erro ao excluir Wordcloud",
                        response.value.error,
                        'error'
                    )
                }
            }
        });        
        this.setState({loading: false});
    }

    render() {
        if(this.state.wordcloud)
            var formatedCreatedAtDate = format(new Date(this.state.wordcloud.created_at), 'dd MMMM yyyy - HH:MM', {locale: ptBR});    

        return (
            <div className={nlpModalStyles.container}>
                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        Wordcloud - Arquivo: {this.props.datafile.name}
                    </p>
                    <button className={modalStyles.closeModalButton}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>                
                <p className={modalStyles.modalDescription}>
                    Método de análise desenvolvido para gerar uma representação visual de dados de textuais, 
                    aonde, as palavras mais relevantes no seu conjunto de texto, terão um tamanho de fonte maior
                </p>                
                <hr />
                <div className={nlpModalStyles.actions}>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Novo</p>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                    {/*<button className={styles.actionButton + ' ' + styles.downloadButton}>
                        <p>Baixar</p>
                        <FontAwesomeIcon icon={faArrowCircleDown} />
                    </button>
                    */}
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.deleteButton} onClick={this.handleOnClickExcluir}
                        disabled={!this.state.wordcloud}
                    >
                        <p>Excluir</p>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
                {
                    // Renderiza a msg de erro retornada da api
                    this.state.error && 
                    <p className={"error " + nlpModalStyles.error}>{this.state.error}</p>
                }
                {   // Renderiza o gif de loading
                    this.state.loading && <LoadingSpinnerComponent />
                }
                {
                    // Renderiza o component que exibe o progresso da tarefa
                    (
                        this.state.tasks &&
                        this.state.tasks.tasks[0].status !== "success"                        
                    ) && 
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Construindo um novo wordcloud"/>                    
                }
                {
                    // Se nao aconteceu nenhum erro,
                    // Se nao tem nenhuma tarefa em andamento,
                    // Exibe o wordcloud
                    (
                        (!this.state.error) &&
                        (!this.state.loading) &&
                        (this.state.tasks) &&
                        (!["queued", "in_progress"].includes(this.state.tasks.tasks[0].status)) &&
                        this.state.wordcloud
                    ) && 
                    <div className={nlpModalStyles.nlpImgResult}>
                        <img src={"data:image/png;base64," + this.state.wordcloud.base64_image} alt="Wordcloud do dataset"/>
                        <p>{formatedCreatedAtDate}</p>
                    </div>    
                }
                

            </div>
        );
    }
}

