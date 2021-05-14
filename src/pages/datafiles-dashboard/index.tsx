import React, { Component } from "react";
import Modal from "react-modal";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import dataFileCardStyles from "./components/DataFileCard/styles.module.scss";
import pagesStyles from "../pagesStyles.module.scss";
import modalStyles from "../../styles/modalStyles.module.scss";

import { BackgroundComponent } from "../../components/Background";
import { HeaderComponent } from "../../components/Header";
import { LoadingSpinnerComponent } from "../../components/loading";
import { DataFileCardComponent } from "./components/DataFileCard";
import { AddDataFileModalComponent } from "./components/AddDataFileModal";

import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";



function AddCard(id: number, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void ) {
  return (
    <div className={dataFileCardStyles.fileCard} key="add_datafile">
      <button className={styles.addButton} onClick={onClick}>          
          <FontAwesomeIcon icon={faPlusCircle} size="4x" />
      </button>
    </div>
  );
}

interface IDashBoardState {
  datafiles: Array<DataFileType>,
  total: number,
  error: string,
  loading: boolean,
  modalAddFileIsOpen: boolean
}

class DatafilesDashboardComponent extends Component<RouteComponentProps, IDashBoardState> {
  dataFilesService: DataFilesService;

  constructor(props) {
    super(props);
    this.dataFilesService = new DataFilesService();
    this.state = {
      datafiles: new Array<DataFileType>(),
      total: 0,
      error: "",
      loading: false,
      modalAddFileIsOpen: false
    };
    this.get = this.get.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onExcludeDatafile = this.onExcludeDatafile.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    this.get();  
  }

  async get(){
    await this.dataFilesService.list("created_at", false).then(
      (response) => {
        this.setState({
          loading: false,
          total: response.total,
          datafiles: response.documents,
        });
      },
      (err) => {
        this.setState({ loading: false, error: err.error });
      }
    )
  }

  onExcludeDatafile(id: string){
    let datafiles = this.state.datafiles;
    let rmIndex = datafiles.findIndex(df => df.id === id);
    
    if(rmIndex > -1){      
      if(rmIndex === 0)
        datafiles.shift();
      else
        datafiles.splice(rmIndex, 1);
        
      this.setState({datafiles: datafiles});
    }
  }

  openModal(e: React.MouseEvent) {
    e.preventDefault();
    this.setState({modalAddFileIsOpen: true});
  }

  closeModal(reload: boolean) {
    this.setState({modalAddFileIsOpen: false});
    if(reload)
      this.get();    
  }

  render() {
    const cards = this.state.datafiles.map((d) =>
      <DataFileCardComponent id={d.id} name={d.name} createdAt={d.created_at.toString()} onExclude={this.onExcludeDatafile}/>
    );
    cards.push(AddCard(cards.length, this.openModal));

    const renderElements = () => {
      if(this.state.loading){
        return <LoadingSpinnerComponent />
      }else{
        return (
          <ul className={pagesStyles.cardsList}>
            {cards}
          </ul>
        )
      }
    }

    return (
      <BackgroundComponent>
        <HeaderComponent />
        <Modal 
          isOpen={this.state.modalAddFileIsOpen}
          onRequestClose={() => this.closeModal(false)}
          contentLabel="Modal Adicionar novo conjunto de dados"
          className={modalStyles.defaultModal}
          overlayClassName={modalStyles.overlayModal}
          closeTimeoutMS={500}
        >
          <AddDataFileModalComponent onRequestClose={this.closeModal}/>
        </Modal>
        <div className={pagesStyles.dashBoard}>
          <h1>Seus conjuntos de dados</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          
          {renderElements()}
          
        </div>
      </BackgroundComponent>
    );
  }
}

export const DataFilesDashboardPage = withRouter(DatafilesDashboardComponent);


