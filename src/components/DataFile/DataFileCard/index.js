import PropTypes from "prop-types";
import React, { Component } from "react";
import Swal from 'sweetalert2'

import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Card } from "../Card/styles";
import { DataFile } from "./styles";

import DataFilesService from "../../../services/datafiles";

class DataFileCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showExcludeDataFileAlert: false
    };
    this.service = new DataFilesService();
  }


  handleExcludeDataFileClick() {
    Swal.fire({
      title: "Tem certeza?",
      html: `<p>Ao confirmar, o conjunto de dados <b>${this.props.name}</b> será excluido, juntamente com todas as analises já realizadas.</p>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sim, exclua", 
      showCancelButton: true,
      cancelButtonText: "Não, deixe como esta",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      position: 'top',      
    }).then((value) => {
      if(value.isConfirmed){
        this.service.delete(this.props.id).then((result) => {
          Swal.fire(
            "Excluido!",
            "O arquivo de dados foi excluido com sucesso",
            "success"
          ).then(() => {            
            this.props.history.go(0);
          });
        }, (err) => {
          Swal.fire(
            "Erro ao excluir!",
            `Não foi possivel excluir o arquivo <br />${err.error}`,
            "error"
          ).then(() => {
            this.props.history.go(0);
          });
        });
      }
    })
  }

  handleExcludeDataFile(){
    this.setState({showExcludeDataFileAlert: false});
  }

  render() {
    let year =this.props.createdAt.substring(0, 4);
    let month = this.props.createdAt.substring(5, 7);
    let day = this.props.createdAt.substring(8, 10);
    let hour = this.props.createdAt.substring(11, 13);
    let minute = this.props.createdAt.substring(14, 16);
  
    return (
      <Card key={this.props.id}>
        <DataFile>
          <div className="datafile-header">
            <h1>{this.props.name}</h1>
            <Link onClick={() => this.handleExcludeDataFileClick()}>
              <FontAwesomeIcon icon={faTrashAlt} className="exclude"/>
            </Link>
          </div>
          <Link className="fill-div" to={`/dashboard/${this.props.id}`}/>
          <p className="createdDate">
            {`Enviado em: ${day}/${month}/${year} - ${hour}:${minute}`}
          </p>
        </DataFile>
      </Card>
    );
  }
}


export default withRouter(DataFileCard);