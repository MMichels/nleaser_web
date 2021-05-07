import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { DataFileType } from '../../types/datafiles.types';

import { BackgroundComponent } from '../../components/Background';
import { HeaderComponent } from '../../components/Header';
import { NLPCardComponent } from './components/NLPCard';
import { WordCloudModal } from "./components/WordCloudModal";

import WordcloudExampleImage from "../../assets/images/nlp-methods/wordcloud-background-default.png";

import pagesStyles from "../pagesStyles.module.scss";
import DataFilesService from '../../services/datafiles.service';
import { LoadingSpinnerComponent } from '../../components/loading';

interface INLPDashBoardState {
    datafile_id?: string;
    datafile?: DataFileType;
    error: string | null;
    loading: boolean;
}

class NLPDashBoardComponent extends Component<RouteComponentProps<{datafile_id}>, INLPDashBoardState> {
    dataFilesService: DataFilesService;
    
    constructor(props){
        super(props);
        this.dataFilesService = new DataFilesService();
        this.state = {
            datafile_id: undefined,
            datafile: undefined,
            error: null,
            loading: false,        
        }
    }

    async componentDidMount(){
        const datafile_id = this.props.match.params.datafile_id;
        this.setState({loading: true, datafile_id});
        
        await this.dataFilesService.get(datafile_id).then((datafile) => {
            this.setState({ loading: false, datafile});
        }).catch((error) => {
            console.log(error);
            this.setState({ loading: false, error: error.error})
        });

    }


    render() {

        const nlpMethods = new Array<any>();

        if(!this.state.loading && !this.state.error && (this.state.datafile && this.state.datafile !== undefined)){
            nlpMethods.push(
                <NLPCardComponent 
                    name={"WordCloud"}
                    description={"Transforme seus dados em uma nuvem de palavras"} 
                    imgSrc={WordcloudExampleImage}
                    imgAlt={"Wordcloud do conjunto de dados"}
                    contentLabel={"Modal wordclouds"}
                    datafile={this.state.datafile}
                    
                >
                    <WordCloudModal datafile={this.state.datafile}/>
                </NLPCardComponent>
            );
        }



        console.log(this.state);

        return (
            <BackgroundComponent>
                <HeaderComponent />                
                <div className={pagesStyles.dashBoard}>
                    <h1>
                        Métodos de NLP 
                        {
                            (this.state.datafile) && 
                            <>
                              - Arquivo: {this.state.datafile.name} 
                            </>
                        }
                    </h1>
                    <p className={pagesStyles.descriptionStyled}>
                        Cada um dos métodos abaixo transformam os dados de texto do seu arquivo em informações que podem ser 
                        facilmente interpretadas e utilizadas em analises e tomadas de decisões
                    </p>
                    {
                        // Renderiza o gif de Loading (aguarda pela consulta do arquivo na api)
                        this.state.loading && <LoadingSpinnerComponent />                        
                    }
                    {
                        // Renderiza a mensagem de erro retornada pela API
                        (!this.state.loading && (this.state.error && this.state.error !== undefined)) && 
                        <p className={"error"}>
                            {this.state.error}
                        </p>
                    }
                    {   
                        // Renderiza os cards de NLP
                        (!this.state.loading && (!this.state.error || this.state.error === undefined) && (this.state.datafile !== undefined)) &&
                        <ul className={pagesStyles.cardsList}>
                            {nlpMethods}
                        </ul>
                    }
                </div>
            </BackgroundComponent>
        );
    }
}

export const NLPDashBoardPage = withRouter(NLPDashBoardComponent);