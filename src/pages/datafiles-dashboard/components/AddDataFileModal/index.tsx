import React, { Component } from "react";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";


import styles from "./styles.module.scss";
import modalStyles from "../../../../styles/modalStyles.module.scss";
import formStyles from "../../../../styles/formStyles.module.scss";

import DataFilesService from "../../../../services/datafiles.service";

import { LoadingSpinnerComponent } from "../../../../components/loading";


interface IAddDataFileFormProps {
  onRequestClose?: (reload?: boolean) => void
}

interface IAddDataFileFormState {
  file: any;
  format: string;
  text_column: string;
  language: string;
  separador: string;
  error: string;
  loading: boolean;
}


export class AddDataFileModalComponent extends Component<IAddDataFileFormProps, IAddDataFileFormState> {
  datafilesService: DataFilesService;

  constructor(props){
    super(props);
    this.datafilesService = new DataFilesService();
    this.state = {
      file: null,
      format: "",
      text_column: "",
      language: "",
      separador: ",",
      error: "",
      loading: false
    };
  }

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

    this.setState({loading: true});
    this.datafilesService
      .upload(file, format, text_column, language, separador)
      .then(
        (response) => {          
          this.setState({loading: false});
          Swal.fire({
            title: "Upload realizado!",
            html: `<p>Seu arquivo foi adicionado na fila de processamento!</p>`,
            icon: "success",
            position: "top",
          }).then((value) => this.props.onRequestClose(true));
        },
        (error) => {
          this.setState({loading: false});
          this.setState({ error: error.error });
        }
      );
  };

  render() {
    const renderTextColumnInput = () => {
      if (["csv", "xlsx"].includes(this.state.format)) {
        return (
          <>
          <label htmlFor="text_column">
            Coluna dos dados
            <FontAwesomeIcon 
              icon={faQuestionCircle} 
              size="xs"              
              title="Coluna do arquivo (excel ou csv) que contém os textos que você deseja analisar"
            />
          </label>
          <input className={formStyles.textInputStyled}
            id="text_column"
            name="text_column"
            type="text"
            placeholder="Coluna com as sentenças"
            title="Coluna do arquivo (excel ou csv) com as sentenças que serão analisadas"
            value={this.state.text_column}
            onChange={(e) => this.setState({ text_column: e.target.value })}
          ></input>
          </>
        );
      } else {
        return null;
      }
    };

    const renderSeparatorInput = () => {
      if (this.state.format === "csv") {
        return (
          <>
          <label htmlFor="separador">
            Separador
            <FontAwesomeIcon 
              icon={faQuestionCircle} 
              size="xs"              
              title="Caractere especial utilizado para delimitar as colunas (, ; tab)"
            />
          </label>
          <input className={formStyles.textInputStyled}
            type="text"
            id="separador"
            name="separador"
            placeholder="Caractere CSV(Separador de colunas)"
            title="Caractere especial utilizado para delimitar as colunas (, ; tab)"
            value={this.state.separador}
            onChange={(e) => this.setState({ separador: e.target.value })}
          ></input>
          </>
        );
      }
    };

    return (
        <div className={styles.container}>
          <div className={modalStyles.modalHeader}>
            <p className={modalStyles.modalTitle}>
              Enviar um novo arquivo
            </p>
            <button className={modalStyles.closeModalButton} onClick={(ev) => this.props.onRequestClose(false)}>
              X
            </button>
          </div>
          <p className={modalStyles.modalDescription}>
            Escolha o arquivo e preencha os dados sobre ele para começar a extrair suas informações!
          </p>
          <hr />
          <form className={styles.uploadForm} onSubmit={this.handleUpload}>
            {this.state.error && <p className="error">{this.state.error}</p>}

            <label htmlFor="file">
              Selecione o arquivo
              <FontAwesomeIcon 
                icon={faQuestionCircle} 
                size="xs"              
                title="Procure pelo arquivo que você deseja enviar para a analise"
              />
            </label>
            <input className={formStyles.fileInputStyled}
              id="file"
              name="file"
              type="file"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />

            <label htmlFor="format">
              Formato
              <FontAwesomeIcon 
                icon={faQuestionCircle} 
                size="xs"              
                title="Selecione o formato do arquivo que você está enviando (csv, excel, txt)"
              />
            </label>
            <select className={formStyles.selectInputStyled}
              id="format"
              name="format"
              style={{color: (this.state.format === "") ? '#969696':'black'}}
              onChange={(e) => this.setState({ format: e.target.value })}
              title="Selecione o formato do arquivo"
            >
              <option value="" style={{color: '#555'}}>Selecione o formato do arquivo</option>
              <option value="xlsx" title="Arquivo do Excel">Excel (xlsx)</option>
              <option value="csv" title="Arquivo separado por caracteres">Arquivo CSV</option>
              <option value="txt" title="Um arquivo txt, cada linha é uma sentença">Lista de sentenças (txt)</option>
            </select>

            {renderTextColumnInput()}
            {renderSeparatorInput()}


            <label htmlFor="language">
              Idioma
              <FontAwesomeIcon 
                icon={faQuestionCircle} 
                size="xs"              
                title="Selecione o idioma dos textos do arquivo"
              />
            </label>
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
              {!this.state.loading && 
                <>
                  <p>Enviar</p>
                  <FontAwesomeIcon icon={faUpload} />
                </>
              }
              {
                this.state.loading && <LoadingSpinnerComponent />
              }
            </button>
          </form>
        </div>
    );
  }
}
