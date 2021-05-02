import React, { Component } from 'react';

import styles from "./styles.module.scss";
import modalStyles from "../../../../styles/modalStyles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faPlusCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { DataFileType } from '../../../../types/datafiles.types';
import { WordCloudService } from '../../../../services/wordcloud.service';
import { TasksType, TaskType } from '../../../../types/tasks.types';
import { WordCloudType } from '../../../../types/wordcloud.types';
import { TaskInfoComponent } from '../../../../components/task-info';

interface IWordCloudModalProps {
    datafile: DataFileType;
}

interface IWordCloudModalState {
    error: string;
    loading: boolean;
    wordcloud: WordCloudType | null;
    tasks: TasksType | null;
}

export class WordCloudModal extends Component<IWordCloudModalProps, IWordCloudModalState> {
    wordcloudService: WordCloudService;

    constructor(props){
        super(props);
        this.wordcloudService = new WordCloudService();
        this.state = {
            error: null,
            loading: false, 
            wordcloud: null,
            tasks: null
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        await this.wordcloudService.get(this.props.datafile.id).then((response) =>{
            this.setState({wordcloud: response});            
        }).catch((err) => {
            this.setState({error: err.error});
        });

        if(!this.state.error){
            await this.wordcloudService.getTasks(this.props.datafile.id).then((response) => {
                this.setState({tasks : response});
            }).catch((err) => {
                this.setState({error: err.error});
            })
        }

        this.setState({loading: false});
    }



    render() {        
        return (
            <div className={styles.container}>
                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        Wordcloud
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
                <div className={styles.actions}>
                    <button className={styles.actionButton + ' ' + styles.createNewButton}>
                        <p>Novo</p>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                    <button className={styles.actionButton + ' ' + styles.downloadButton}>
                        <p>Baixar</p>
                        <FontAwesomeIcon icon={faArrowCircleDown} />
                    </button>
                    <button className={styles.actionButton + ' ' + styles.deleteButton}>
                        <p>Excluir</p>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
                {
                    (
                        this.state.error && this.state.error !== undefined
                    ) && 
                    <p className={"error " + styles.error}>{this.state.error}</p>
                }
                {
                    // Renderiza o component que exibe o progresso da tarefa
                    (
                        this.state.tasks &&
                        this.state.tasks.tasks[0].status !== "success"                        
                    ) && 
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} />
                }
                {
                    // Se nao aconteceu nenhum erro,
                    // Se nao tem nenhuma tarefa em andamento,
                    // Exibe o wordcloud
                    (
                        (!this.state.error) &&
                        (this.state.tasks) &&
                        (!["queued", "progress"].includes(this.state.tasks.tasks[0].status)) &&
                        this.state.wordcloud
                    ) && 
                    <div className="nlpImgResult">
                        <img src={this.state.wordcloud.base64_image} alt="Wordcloud do dataset"/>
                        <p>{this.state.wordcloud.created_at}</p>
                    </div>    
                }
                

            </div>
        );
    }
}

