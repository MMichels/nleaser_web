import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";


import styles from "./styles.module.scss";
import pagesStyles from "../pagesStyles.module.scss";

import { LoadingSpinnerComponent } from "../../components/loading";
import { DataFileCardComponent } from "./components/DataFileCard";
import { AddDataFileModalComponent } from "./components/AddDataFileModal";

import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";
import { Card } from "react-bootstrap";

interface IAddCardProps {
  id: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AddCard({id, onClick} : IAddCardProps) {
  return (
    <Card bg="secondary" key="add_datafile" className={styles.card + " col-4 bg-gradient" } style={{width: '33%'}}>
      <Card.Body className="d-flex align-items-center">
        <button className={styles.addButton} onClick={onClick}>          
            <FontAwesomeIcon icon={faPlusCircle} size="4x" />
        </button>
      </Card.Body>
    </Card>
  );
}

const DatafilesDashboardComponent = () => {
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
    await DataFilesService.list("created_at", false).then(
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

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <AddDataFileModalComponent show={modalAddFileIsOpen} onRequestClose={closeModal}/>

        <h1 className={"text-center text-white fs-1 " + pagesStyles.dashBoardTitle}>Seus conjuntos de dados</h1>
        
        {error && <p className="error">{error}</p>}

        <div>
          {
            loading ? <LoadingSpinnerComponent /> : (
              <ul className="row justify-content-center gap-1 p-0 m-0">
                {
                  dataFiles.map(
                    (d, idx) => 
                      <DataFileCardComponent className={styles.card} key={idx} id={d.id} name={d.name} createdAt={d.created_at.toString()} onExclude={onExcludeDatafile}/>
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


