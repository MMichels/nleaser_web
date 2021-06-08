import React, { Component } from 'react';

import { NerResumeService } from '../../../../../services/ner_resume.service';

import nlpModalStyles from "../nlpModalStyles.module.scss";
import modalStyles from "../../../../../styles/modalStyles.module.scss";

import { DataFileType } from '../../../../../types/datafiles.types';
import { NerResumePaginationType, NerResumeType, EntityType } from '../../../../../types/ner.types';
import { TasksType } from '../../../../../types/tasks.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinnerComponent } from '../../../../../components/loading';
import { TaskInfoComponent } from '../../../../../components/task-info';


interface INerResumeModalProps {
    datafile: DataFileType;
}

interface INerResumeModalState {
    error?: string;
    loading: boolean;
    extracted_entities?: NerResumeType;
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
            extracted_entities: null,
            tasks: null,
            page: 1,
            pagination: new NerResumePaginationType()
        };

        this.getTasks = this.getTasks.bind(this);
        this.getNerResume = this.getNerResume.bind(this);
        this.monitoringNerResumeProcessing = this.monitoringNerResumeProcessing.bind(this);

        this.changePage = this.changePage.bind(this);
        this.changeOrdenation = this.changeOrdenation.bind(this);
        
        this.handleOnClickNovo = this.handleOnClickNovo.bind(this);
        this.handleOnClickExcluir = this.handleOnClickExcluir.bind(this);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    async getTasks() {

    }

    async getNerResume(page: number) {
        
    }

    async monitoringNerResumeProcessing() {

    }

    changePage() {

    }

    changeOrdenation() {

    }

    async handleOnClickNovo(e: React.MouseEvent) {

    }

    async handleOnClickExcluir(e: React.MouseEvent){

    }

    render() {
        return (
            <div className={nlpModalStyles.container}>

                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        NER - Arquivo: {this.props.datafile.name}
                    </p>
                    <button className={modalStyles.closeModalButton}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
                <p className={modalStyles.modalDescription}>
                    Identifica quais são as entidades, ou seja, nomes de pessoas, de lugares, empresas, dentre outros, que aparecem com maior frequência no conjunto de textos!
                </p>
                <hr />

                <div className={nlpModalStyles.actions}>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.createNewButton} onClick={this.handleOnClickNovo}>
                        <p>Novo</p>
                        <FontAwesomeIcon icon={faPlusCircle} />                        
                    </button>
                    <button className={nlpModalStyles.actionButton + ' ' + nlpModalStyles.deleteButton} onClick={this.handleOnClickExcluir}
                        disabled={!this.state.extracted_entities}
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
                    <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Identificando entidades" />
                }              

            </div>
        );
    }
}

export default NerResumeModal;