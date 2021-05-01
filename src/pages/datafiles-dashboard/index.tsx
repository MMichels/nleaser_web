import React, { Component } from "react";
import Modal from "react-modal";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import dataFileCardStyles from "./components/DataFileCard/styles.module.scss";
import modalStyles from "../../styles/modalStyles.module.scss";

import { BackgroundComponent } from "../../components/Background";
import { HeaderComponent } from "../../components/Header";
import { LoadingSpinnerComponent } from "../../components/loading";
import { DataFileCardRoutedComponent } from "./components/DataFileCard";
import { AddDataFileModalComponent } from "./components/AddDataFileModal";

import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";



function AddCard(id: number, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void ) {
  return (
    <div className={dataFileCardStyles.fileCard} key={id}>
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
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  async componentDidMount() {
    this.setState({loading: true});
    await this.dataFilesService.list("created_at", false).then(
      (response) => {
        this.setState({loading: false});
        this.setState({
          total: response.total,
          datafiles: response.documents,
        });
      },
      (err) => {
        this.setState({ loading: false });
        this.setState({ error: err.error });
      }
    );
  }

  openModal(e: React.MouseEvent) {
    e.preventDefault();
    this.setState({modalAddFileIsOpen: true});
  }

  closeModal() {
    this.setState({modalAddFileIsOpen: false});
  }

  render() {
    const cards = this.state.datafiles.map((d) =>
      <DataFileCardRoutedComponent id={d.id} name={d.name} createdAt={d.created_at.toString()} />
    );
    cards.push(AddCard(cards.length, this.openModal));

    const renderElements = () => {
      if(this.state.loading){
        return <LoadingSpinnerComponent />
      }else{
        return (
          <div className={styles.dataFileCardsList}>
            {cards}
          </div>
        )
      }
    }

    return (
      <BackgroundComponent>
        <HeaderComponent />
        <Modal 
          isOpen={this.state.modalAddFileIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal Adicionar novo conjunto de dados"
          className={modalStyles.defaultModal}
          overlayClassName={modalStyles.overlayModal}
          closeTimeoutMS={500}
        >
          <AddDataFileModalComponent onRequestClose={this.closeModal}/>
        </Modal>
        <div className={styles.dashBoard}>
          <h1>Seus conjuntos de dados</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          {renderElements()}
        </div>
      </BackgroundComponent>
    );
  }
}

export const DataFilesDashboardPage = withRouter(DatafilesDashboardComponent);


