import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import { Container, PageTitle } from "../../styles";
import { UploadForm, FormRow, FormLabelCol, FormInputCol } from "./styles";

import DataFilesService from "../../../services/datafiles";

class AdicionarDatasetComponent extends Component {
  datafilesService = new DataFilesService();
  state = {
    file: null,
    format: "xlsx",
    text_column: "",
    language: "english",
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
            html: `<p>Seu arquivo já esta disponivel para analise</p>`,
            icon: "success",
            position: "top",
          }).then(this.props.history.push(`/dashboard/${response.id}`));
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
          <FormRow>
            <FormLabelCol>
              <label for="text_column">Coluna com as sentenças: </label>
            </FormLabelCol>
            <FormInputCol>
              <input
                id="text_column"
                name="text_column"
                type="text"
                onChange={(e) => this.setState({ text_column: e.target.value })}
              ></input>
            </FormInputCol>
          </FormRow>
        );
      } else {
        return null;
      }
    };

    const renderSeparatorInput = () => {
      if (this.state.format === "csv") {
        return (
          <FormRow>
            <FormLabelCol>
              <label for="separador">Caractere CSV: </label>
            </FormLabelCol>
            <FormInputCol>
              <input
                type="text"
                id="separador"
                name="separador"
                value={this.state.separador}
                onChange={(e) => this.setState({ separador: e.target.value })}
              ></input>
            </FormInputCol>
          </FormRow>
        );
      }
    };

    return (
      <div>
        <PageTitle>Dashboard - Upload</PageTitle>
        <Container>
          <h2>Enviar um novo arquivo</h2>
          <UploadForm onSubmit={this.handleUpload}>
            {this.state.error && <p className="error">{this.state.error}</p>}

            <FormRow>
              <FormLabelCol>
                <label for="file">Arquivo: </label>
              </FormLabelCol>
              <FormInputCol>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => this.setState({ file: e.target.files[0] })}
                />
              </FormInputCol>
            </FormRow>

            <FormRow>
              <FormLabelCol>
                <label for="format">Formato do arquivo: </label>
              </FormLabelCol>
              <FormInputCol>
                <select
                  id="format"
                  name="format"
                  onChange={(e) => this.setState({ format: e.target.value })}
                >
                  <option value="xlsx">Excel (xlsx)</option>
                  <option value="csv">Arquivo CSV</option>
                  <option value="txt">Lista de sentenças (txt)</option>
                </select>
              </FormInputCol>
            </FormRow>
            {renderTextColumnInput()}
            {renderSeparatorInput()}
            <FormRow>
              <FormLabelCol>
                <label for="language">Idioma do arquivo: </label>
              </FormLabelCol>
              <FormInputCol>
                <select
                  id="language"
                  name="language"
                  onChange={(e) => this.setState({ language: e.target.value })}
                >
                  <option value="english">English (USA)</option>
                  <option value="portuguese">Português (Brasil)</option>
                </select>
              </FormInputCol>
            </FormRow>
            <button type="submit">Upload</button>
          </UploadForm>
        </Container>
      </div>
    );
  }
}

export const AdicionarDatasetPage = withRouter(AdicionarDatasetComponent);
