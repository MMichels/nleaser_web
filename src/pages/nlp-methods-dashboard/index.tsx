import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { DataFileType } from '../../types/datafiles.types';

import { BackgroundComponent } from '../../components/Background';
import { HeaderComponent } from '../../components/Header';
import { NLPCardComponent } from './components/NLPCard';
import { WordCloudModal } from "./components/WordCloudModal";

import WordcloudExampleImage from "../../assets/images/nlp-methods/wordcloud-background-default.png";

import styles from "./styles.module.scss";
import pagesStyles from "../pagesStyles.module.scss";

interface INLPDashBoardState {
    datafile_id?: string;
    datafile?: DataFileType;
}

class NLPDashBoardComponent extends Component<RouteComponentProps<{datafile_id}>, INLPDashBoardState> {
    
    constructor(props){
        super(props);
        this.state = {
            datafile_id: undefined,
            datafile: undefined
        }
    }

    async componentDidMount(){
        const datafile_id = this.props.match.params.datafile_id;
        this.setState({datafile_id});         

    }


    render() {

        const nlpMethods = new Array<any>();
        nlpMethods.push(
            <NLPCardComponent 
                name={"WordCloud"}
                description={"Transforme seus dados em uma nuvem de palavras"} 
                imgSrc={WordcloudExampleImage}
                imgAlt={"Wordcloud do conjunto de dados"}
                contentLabel={"Modal wordclouds"}
            >
                <WordCloudModal />
            </NLPCardComponent>
        )



        return (
            <BackgroundComponent>
                <HeaderComponent />
                <div className={pagesStyles.dashBoard}>
                    <h1>Métodos de NLP</h1>
                    <p className={pagesStyles.descriptionStyled}>
                        Cada um dos métodos abaixo transformam os dados de texto do seu arquivo em informações que podem ser 
                        facilmente interpretadas e utilizadas em analises e tomadas de decisões
                    </p>                    
                    <ul className={pagesStyles.cardsList}>
                        {nlpMethods}
                    </ul>
                </div>
            </BackgroundComponent>
        );
    }
}

export const NLPDashBoardPage = withRouter(NLPDashBoardComponent);