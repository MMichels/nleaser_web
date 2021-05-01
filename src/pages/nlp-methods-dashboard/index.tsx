import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { DataFileType } from '../../types/datafiles.types';

import { BackgroundComponent } from '../../components/Background';
import { HeaderComponent } from '../../components/Header';


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
        return (
            <BackgroundComponent>
                <HeaderComponent />
                <div>
                    <p>
                        PQ QUE É TÃO DIFICIL FAZER DECISÕES BICHO?
                        {this.state.datafile_id}
                    </p>
                </div>
            </BackgroundComponent>
        );
    }
}

export const NLPDashBoardPage = withRouter(NLPDashBoardComponent);