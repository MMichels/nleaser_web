import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import dataFileCardStyles from "./components/DataFileCard/styles.module.scss";
import pagesStyles from "../pagesStyles.module.scss";
import modalStyles from "../../styles/modalStyles.module.scss";
import addDatafileStyles from "./components/AddDataFileModal/styles.module.scss";

import { LoadingSpinnerComponent } from "../../components/loading";
import { DataFileCardComponent } from "./components/DataFileCard";
import { AddDataFileModalComponent } from "./components/AddDataFileModal";

import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";
import { Container } from "react-bootstrap";

interface IAddCardProps {
  id: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AddCard({id, onClick} : IAddCardProps) {
  return (
    <div className={dataFileCardStyles.fileCard + " mt-5"} key="add_datafile">
      <button className={styles.addButton} onClick={onClick}>          
          <FontAwesomeIcon icon={faPlusCircle} size="4x" />
      </button>
    </div>
  );
}

const DatafilesDashboardComponent = () => {
  const dataFilesService = useRef(new DataFilesService());
  const [dataFiles, setDataFiles] = useState(new Array<DataFileType>());
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalAddFileIsOpen, setModalAddFileOpen] = useState(false);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setLoading(true);
    await dataFilesService.current.list("created_at", false).then(
      (response) => {
        setLoading(false);
        setTotal(response.total);
        setDataFiles(response.documents);
      },
      (err) => {
        setLoading(false);
        setError(err.error);
      }
    )
  }

  const onExcludeDatafile = (id: string) => {
    let _dataFiles = {...dataFiles};
    let rmIndex = _dataFiles.findIndex(df => df.id === id);
    
    if(rmIndex > -1){      
      if(rmIndex === 0)
        _dataFiles.shift();
      else
        _dataFiles.splice(rmIndex, 1);
        
      setDataFiles(_dataFiles);
    }
  }

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalAddFileOpen(true);
  }

  const closeModal = (reload: boolean) => {
    setModalAddFileOpen(false);
    if(reload)
      get();    
  }

  const cards = dataFiles.map((d) =>
      <DataFileCardComponent id={d.id} name={d.name} createdAt={d.created_at.toString()} onExclude={onExcludeDatafile}/>
    );
  cards.push();

  const renderElements = () => {
    if(loading){
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
    <div className="w-100 h-100 overflow-scroll">
      <Modal 
        isOpen={modalAddFileIsOpen}
        onRequestClose={() => closeModal(false)}
        contentLabel="Modal Adicionar novo conjunto de dados"
        className={addDatafileStyles.addFileModal}
        overlayClassName={modalStyles.overlayModal}
        closeTimeoutMS={500}
      >
        <AddDataFileModalComponent onRequestClose={closeModal}/>
      </Modal>
      <div className="w-100 h-100">
        <h1 className={"text-center text-white fs-1 " + pagesStyles.dashBoardTitle}>Seus conjuntos de dados</h1>
        {error && <p className="error">{error}</p>}
        {
          loading ? <LoadingSpinnerComponent /> : (
            <ul className="row p-0 m-0">
              {
                dataFiles.map(
                  (d, idx) => 
                    <DataFileCardComponent key={idx} id={d.id} name={d.name} createdAt={d.created_at.toString()} onExclude={onExcludeDatafile}/>
                )
              }
              <AddCard id={total + 1} onClick={openModal} />

            </ul>
          )
        }
        
      </div>
    </div>
  );
}

export const DataFilesDashboardPage = withRouter(DatafilesDashboardComponent);


