import React, { Component } from "react";
import Swal from 'sweetalert2'
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from "react-router-dom";
import styles from "./styles.module.scss";


import DataFilesService from "../../../../services/datafiles.service";
import { TasksType } from "../../../../types/tasks.types";
import { LoadingSpinnerComponent } from "../../../../components/loading";
import { TaskInfoComponent } from "../../../../components/task-info";


interface IDataFileCardProps {
  id: string;   // ID do arquivo
  name: string; // Nome do arquivo
  createdAt: string; // Data de importação do arquivo
  onExclude: (id: string) => void;
}

interface IDatafileCardState {  
  error: string | null;
  loading: boolean;
  tasks: TasksType | null;
}

export class DataFileCardComponent extends Component<IDataFileCardProps, IDatafileCardState> {
  private _datafileService: DataFilesService;

  constructor(props) {
    super(props);    
    this._datafileService = new DataFilesService();

    this.state = {
      error: null,
      tasks: null,
      loading: false
    }    

    this.getTasks = this.getTasks.bind(this);
  }

  async componentDidMount() {
    this.setState({loading: true});

    await this.monitoringDatafileProcessing();

    this.setState({loading: false});
  }

  async getTasks() {

    await this._datafileService.getTasks(this.props.id).then((response) => {
      this.setState({tasks: response, error: response.error});
    }).catch((error) => {
      this.setState({error: error.error});
    })

  }

  async monitoringDatafileProcessing() {
    await this.getTasks();

    if(['queued', 'in_progress'].includes(this.state.tasks.tasks[0].status)){
      setTimeout(() => {                
          this.monitoringDatafileProcessing();
      }, 1000);
    }    
  }


  handleExcludeDataFileClick() {
    Swal.fire({
      title: "Tem certeza?",
      html: `<p>Ao confirmar, o conjunto de dados <b>${this.props.name}</b> será excluído, juntamente com todas as analises já realizadas.</p>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sim, exclua",
      showCancelButton: true,
      cancelButtonText: "Não, deixe como esta",
      showLoaderOnConfirm: true,
      preConfirm: () => this._datafileService.delete(this.props.id),
      reverseButtons: true,
      position: 'top',
    }).then((response) => {
      if(response.isConfirmed){
        if (response.value.deleted) {       
          this.props.onExclude(this.props.id);   
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

  render() {
    const formatedCreatedAtDate = format(new Date(this.props.createdAt), 'dd MMMM yyyy - HH:MM', {locale: ptBR});

    const renderLink = (
      !this.state.loading && 
      (this.state.error === null) && 
      (this.state.tasks !== null) &&
      (this.state.tasks.tasks[0].status === "success")
    )
  

    return (
      <li className={styles.fileCard} key={this.props.id}>
        <div className={styles.dataFile}>
          <div className={styles.datafileHeader}>
            <h1>{this.props.name}</h1>

          </div>
            {
              this.state.error && <p className="error">{this.state.error}</p>
            }
            {
              this.state.loading && <LoadingSpinnerComponent />
            }
            {
              (
                this.state.tasks &&
                this.state.tasks.tasks[0].status !== "success"
              ) &&
              <TaskInfoComponent task={this.state.tasks.tasks[0]} title="Importando arquivo" />
            }
            {
              renderLink &&
              <div className={styles.datafileBody}>
                <Link className="fill-div flex-column" to={`/dashboard/nlp/${this.props.id}`}>              
                  <h2>Importado com sucesso</h2>
                  <p>Acessar métodos de nlp</p>
                </Link>
              </div>
            }
            <div className={styles.datafileFooter}>
              <hr />
              <button onClick={() => this.handleExcludeDataFileClick()} className ={styles.excludeDatafile}>
                Excluir
                </button>
              <p className={styles.createdDate}>
              {`Enviado em: ${formatedCreatedAtDate}`}
              </p>
            </div>
        </div>
        
      </li>
    );
  }
}
