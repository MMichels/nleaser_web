import React, { Component } from "react";
import Swal from 'sweetalert2'
import format from "date-fns/format"
import ptBR from 'date-fns/locale/pt-BR';

import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";


import DataFilesService from "../../../../services/datafiles.service";


interface IDataFileCardProps {
  id: string;   // ID do arquivo
  name: string; // Nome do arquivo
  createdAt: string; // Data de importação do arquivo
}

class DataFileCardComponent extends Component<RouteComponentProps<{}> & IDataFileCardProps> {
  private _datafileService: DataFilesService;

  constructor(props) {
    super(props);    
    this._datafileService = new DataFilesService();
    
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
      reverseButtons: true,
      position: 'top',
    }).then((value) => {
      if (value.isConfirmed) {
        this._datafileService.delete(this.props.id).then(() => {
          Swal.fire(
            "Excluído!",
            "O arquivo de dados foi excluído com sucesso",
            "success"
          ).then(() => {
            this.props.history.go(0);
          });
        }, (err) => {
          Swal.fire(
            "Erro ao excluir!",
            `Não foi possível excluir o arquivo <br />${err.error}`,
            "error"
          ).then(() => {
            this.props.history.go(0);
          });
        });
      }
    })
  }

  handleExcludeDataFile() {
    this.setState({ showExcludeDataFileAlert: false });
  }

  render() {
    const formatedCreatedAtDate = format(new Date(this.props.createdAt), 'dd MMMM yyyy - HH:MM', {locale: ptBR});

    return (
      <li className={styles.fileCard} key={this.props.id}>
        <div className={styles.dataFile}>
          <div className={styles.datafileHeader}>
            <h1>{this.props.name}</h1>
            <span onClick={() => this.handleExcludeDataFileClick()}>
              <FontAwesomeIcon icon={faTrashAlt} className="exclude" />
            </span>
          </div>
          <Link className="fill-div" to={`/dashboard/nlp/${this.props.id}`} />
          <p className={styles.createdDate}>
            {`Enviado em: ${formatedCreatedAtDate}`}
          </p>
        </div>
      </li>
    );
  }
}

export const DataFileCardRoutedComponent = withRouter(DataFileCardComponent);