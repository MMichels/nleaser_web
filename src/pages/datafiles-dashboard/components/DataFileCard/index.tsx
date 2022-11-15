import React, { Component, useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2'
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from "react-router-dom";
import styles from "./styles.module.scss";


import DataFilesService from "../../../../services/datafiles.service";
import { TasksType } from "../../../../types/tasks.types";
import { LoadingSpinnerComponent } from "../../../../components/loading";
import { TaskInfoComponent } from "../../../../components/task-info";
import { Button, Card } from "react-bootstrap";


interface IDataFileCardProps {
  id: string;   // ID do arquivo
  name: string; // Nome do arquivo
  createdAt: string; // Data de importação do arquivo
  onExclude: (id: string) => void;
}
export const DataFileCardComponent = React.memo((props:IDataFileCardProps) => {
  const _datafileService = useRef( new DataFilesService());
  const _timerConsulta = useRef(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TasksType|null>(null);
  

  const getTasks = async () =>{
    await _datafileService.current.getTasks(props.id).then((response) => {
      setTasks(response);
      setError(null);
    }).catch((error) => {
      setError(error.error);
    })
  }

  const monitoringDatafileProcessing = async () => {
    await getTasks();
    if(['queued', 'in_progress'].includes(tasks?.tasks[0].status)){      
      _timerConsulta.current = setTimeout(async () => {                
          await monitoringDatafileProcessing();
      }, 1000);
    }    
  }  

  useEffect(() => {
    debugger;
    monitoringDatafileProcessing().then(() => setLoading(false));
    return () => {
      clearTimeout(_timerConsulta.current)
    };
  },[])

  const handleExcludeDataFileClick = () => {
    Swal.fire({
      title: "Tem certeza?",
      html: `<p>Ao confirmar, o conjunto de dados <b>${props.name}</b> será excluído, juntamente com todas as analises já realizadas.</p>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sim, exclua",
      showCancelButton: true,
      cancelButtonText: "Não, deixe como esta",
      showLoaderOnConfirm: true,
      preConfirm: () => _datafileService.current.delete(props.id),
      reverseButtons: true,
      position: 'top',
    }).then((response) => {
      if(response.isConfirmed){
        if (response.value.deleted) {       
          props.onExclude(props.id);   
          Swal.fire(
            "Excluído!",
            "O arquivo de dados foi excluído com sucesso",
            "success"
          );
        }
        else { 
          Swal.fire(
            "Erro ao excluir!",
            `Não foi possível excluir o arquivo <br />${response.value.error}`,
            "error"
          );
        }
      }
    }, (err) => {
        Swal.fire(
          "Erro ao excluir!",
          `Não foi possível excluir o arquivo <br />${err.error}`,
          "error"
        );
    });
  }

  
  const formatedCreatedAtDate = format(new Date(props.createdAt), 'dd MMMM yyyy - HH:MM', {locale: ptBR});

  const renderLink = (
    !loading && 
    (error === null) && 
    (tasks !== null) &&
    (tasks?.tasks[0].status === "success")
  ) 

  return (
    <Card key={props.id} bg="dark" style={{width: "33%", margin: "8px 2px"}} >      
      <Card.Header className={styles.header + " p-0 m-0 py-2 text-white text-capitalize text-center text-nowrap fs-4 overflow-hidden"}>
          {props.name}
        </Card.Header>
      <Card.Body className="d-flex">
          {
            error && <Card.Text className="text-danger">{error}</Card.Text>
          }
          {
            loading &&
              <LoadingSpinnerComponent />
          }
          {
            (
              tasks &&
              tasks?.tasks[0].status !== "success"
            ) &&
            <TaskInfoComponent task={tasks.tasks[0]} title="Importando arquivo" />
          }
          {
            renderLink &&
            <div>
              <Link className="d-flex row text-decoration-none text-light text-center align-items-center h-100" to={`/dashboard/nlp/${props.id}`}>              
                <h2 className="text-success">Importado com sucesso</h2>
                <p className={styles.accessNlpLink}>Acessar métodos de NLP!!</p>
              </Link>
            </div>
          }
      </Card.Body>
      <Card.Footer className="d-flex column align-items-end justify-content-between">
        <p className={"text-white-50 text-end p-0 m-0"}>
          {`Enviado em: ${formatedCreatedAtDate}`}
        </p>
        <Button variant="danger" onClick={() => handleExcludeDataFileClick()}>
          Excluir
        </Button>
      </Card.Footer>
      
    </Card>
  );
})