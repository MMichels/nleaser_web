import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


import styles from "./styles.module.scss";
import modalStyles from "../../../styles/modalStyles.module.scss";
import formStyles from "../../../styles/formStyles.module.scss";

import DataFilesService from "../../../services/datafiles.service";


interface IAddDataFileFormProps {
  onRequestClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


class AddDataFileFormComponent extends Component<RouteComponentProps<{}> & IAddDataFileFormProps> {
  datafilesService = new DataFilesService();
  state = {
    file: null,
    format: "xlsx",
    text_column: "",
    language: "",
    separador: ";",
    error: "",
  };

  handleUpload = async (e) => {
    e.preventDefault();
    const { file, format, text_column, language, separador } = this.state;
    if (!file || !format || !language) {
      this.setState({
        error: "O arquivo, o formato e o idioma são obrigatórios",
      });
      return;
    }
    if (format !== "txt" && !text_column) {
      this.setState({ error: "Informe a coluna que contem as sentenças" });
      return;
    }

    this.datafilesService
      .upload(file, format, text_column, language, separador)
      .then(
        (response) => {
          Swal.fire({
            title: "Upload realizado!",
            html: `<p>Seu arquivo já esta disponível para analise</p>`,
            icon: "success",
            position: "top",
          }).then((value) => this.props.history.push(`/dashboard/${response.id}`));
        },
        (error) => {
          this.setState({ error: error.error });
        }
      );
  };

  render() {
    const renderTextColumnInput = () => {
      if (this.state.format !== "txt") {
        return (
          <input className={formStyles.textInputStyled}
            id="text_column"
            name="text_column"
            type="text"
            placeholder="Coluna dos textos"
            value={this.state.text_column}
            onChange={(e) => this.setState({ text_column: e.target.value })}
          ></input>
        );
      } else {
        return null;
      }
    };

    const renderSeparatorInput = () => {
      if (this.state.format === "csv") {
        return (
          <input className={formStyles.textInputStyled}
            type="text"
            id="separador"
            name="separador"
            placeholder="Caractere CSV(Separador)"
            value={this.state.separador}
            onChange={(e) => this.setState({ separador: e.target.value })}
          ></input>
        );
      }
    };

    return (
        <div className={styles.container}>
          <div className={modalStyles.modalHeader}>
            <p className={modalStyles.modalTitle}>
              Enviar um novo arquivo
            </p>
            <button className={modalStyles.closeModalButton} onClick={this.props.onRequestClose}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
          <p className={modalStyles.modalDescription}>
            Escolha o arquivo e preencha as informações sobre ele para começar a extrair suas informações!
          </p>
          <hr />
          <form className={styles.uploadForm} onSubmit={this.handleUpload}>
            {this.state.error && <p className="error">{this.state.error}</p>}

            <input className={formStyles.fileInputStyled}
              id="file"
              name="file"
              type="file"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />

            <select className={formStyles.textInputStyled}
              id="format"
              name="format"
              onChange={(e) => this.setState({ format: e.target.value })}
            >
              <option value="" style={{color: '#555'}}>Formato do arquivo</option>
              <option value="xlsx">Excel (xlsx)</option>
              <option value="csv">Arquivo CSV</option>
              <option value="txt">Lista de sentenças (txt)</option>
            </select>

            {renderTextColumnInput()}
            {renderSeparatorInput()}

            <select className={formStyles.selectInputStyled}
              id="language"
              name="language"
              style={{color: (this.state.language === "") ? '#969696':'black'}}
              onChange={(e) => this.setState({ language: e.target.value })}
            >
              <option value="" style={{color: '#555'}}>Idioma do arquivo</option>
              <option value="english">English (USA)</option>
              <option value="portuguese">Português (Brasil)</option>
            </select>

            <button className={formStyles.uploadButtonStyled} type="submit">
              <p>Upload</p>
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </form>
        </div>
    );
  }
}

export const AddDataFileModalComponent = withRouter(AddDataFileFormComponent);
