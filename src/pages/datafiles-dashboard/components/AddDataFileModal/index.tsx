import React, { memo, useRef, useState } from "react";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faQuestionCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import modalStyles from "../../../../styles/modalStyles.module.scss";
import formStyles from "../../../../styles/formStyles.module.scss";

import DataFilesService from "../../../../services/datafiles.service";

import { LoadingSpinnerComponent } from "../../../../components/loading";
import { Tooltip } from "../../../../components/Tooltip";
import { Button, Form, Modal } from "react-bootstrap";


interface IAddDataFileFormProps {
  onRequestClose?: (reload?: boolean) => void
  show: boolean;
}

export const AddDataFileModalComponent = memo(({onRequestClose, show}: IAddDataFileFormProps) => {
  const datafilesService = useRef(new DataFilesService());
  const [file, setFile] = useState<File|null>(null);
  const [format, setFormat] = useState<string|null>("");
  const [textColumn, setTextColumn] = useState<string|null>(null);
  const [language, setLanguage] = useState<string|null>("");
  const [separator, setSeparator] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();    
    if (!file || !format || !language) {
      setError("O arquivo, o formato e o idioma são obrigatórios");
      return;
    }
    if (format !== "txt" && !textColumn) {
      setError("Informe a coluna que contem as sentenças");
      return;
    }

    setLoading(true);

    datafilesService.current
      .upload(file, format, textColumn, language, separator)
      .then(
        (response) => {          
          setLoading(false);
          Swal.fire({
            title: "Upload realizado!",
            html: `<p>Seu arquivo foi adicionado na fila de processamento!</p>`,
            icon: "success",
            position: "top",
          }).then((value) => onRequestClose(true));
        },
        (error) => {
          setLoading(false);
          setError(error.error);
        }
      );
  };

  const renderTextColumnInput = () => {
    if (["csv", "xlsx"].includes(format)) {
      return (        
        <Form.Group className="mb-3">
          <Form.Label htmlFor="textColumn">
            Coluna dos dados
            <Tooltip
              placement="right"
              tooltip="Coluna do arquivo (excel ou csv) que contém os textos que você deseja analisar"
            >
              <button className="btn border-0 bg-transparent p-0 m-0 px-2">
                <FontAwesomeIcon 
                  icon={faQuestionCircle} 
                  size="sm"
                />
              </button>
            </Tooltip>
          </Form.Label>
          <Form.Control className={formStyles.textInputStyled}
            id="textColumn"
            name="textColumn"
            type="text"
            placeholder="Coluna com as sentenças"
            title="Coluna do arquivo (excel ou csv) com as sentenças que serão analisadas"
            value={textColumn}
            onChange={(e) => setTextColumn(e.target.value)}
          />
        </Form.Group>
      );
    } else {
      return null;
    }
  };

  const renderSeparatorInput = () => {
    if (format === "csv") {
      return (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="separator">
            Separador
            <Tooltip
              placement="right"
              tooltip="Caractere especial utilizado para delimitar as colunas (, ; tab)"
            >
              <button className="btn border-0 bg-transparent m-0 p-0 px-2">
                <FontAwesomeIcon 
                  icon={faQuestionCircle} 
                  size="sm"
                />
              </button>
            </Tooltip>
          </Form.Label>
          <Form.Control
            type="text"
            id="separator"
            name="separator"
            placeholder="Caractere CSV(Separador de colunas)"
            title="Caractere especial utilizado para delimitar as colunas (, ; tab)"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
        </Form.Group>
      );
    }
  };

    return (
        <Modal show={show} onHide={() => onRequestClose(false)}>
          <Modal.Header closeButton >
            <Modal.Title>
              Enviar um novo arquivo
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleUpload}>
            <Modal.Body>              
              <p className="text-black text-center mb-3 fs-5">
                Escolha o arquivo e preencha os dados sobre ele para começar a extrair suas informações!
              </p>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="file">
                  Selecione o arquivo
                  <Tooltip 
                    placement="right"
                    tooltip="Procure pelo arquivo que você deseja enviar para a analise"
                  >
                    <button
                      className="btn border border-0 bg-transparent p-0 m-0 px-2"
                    >
                      <FontAwesomeIcon 
                        icon={faQuestionCircle} 
                        size="sm"
                      />
                    </button>
                  </Tooltip>
                </Form.Label>
                <Form.Control
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    console.log(e);                    
                    setFile((e as React.ChangeEvent<HTMLInputElement>).target.files[0]);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="format">
                  Formato
                  <Tooltip
                    placement="right"
                    tooltip="Selecione o formato do arquivo que você está enviando (csv, excel, txt)"
                  >
                    <button className="btn border border-0 bg-transparent p-0 m-0 px-2">
                      <FontAwesomeIcon 
                        icon={faQuestionCircle} 
                        size="sm"
                        />
                    </button>
                  </Tooltip>
                </Form.Label>
                <Form.Select
                  id="format"
                  name="format"
                  style={{color: (format == "") ? '#969696':'black'}}
                  onChange={(e) => setFormat(e.target.value)}
                  title="Selecione o formato do arquivo"
                >
                  <option style={{color: '#555'}}>Selecione o formato do arquivo</option>
                  <option value="xlsx" title="Arquivo do Excel">Excel (xlsx)</option>
                  <option value="csv" title="Arquivo separado por caracteres">Arquivo CSV</option>
                  <option value="txt" title="Um arquivo txt, cada linha é uma sentença">Lista de sentenças (txt)</option>
                </Form.Select>
              </Form.Group>

              {renderTextColumnInput()}
              {renderSeparatorInput()}
              
              <Form.Group>                  
                <Form.Label htmlFor="language">
                  Idioma
                  <Tooltip
                    placement="right"
                    tooltip="Selecione o idioma dos textos do arquivo"
                  >
                    <button className="btn border-0 bg-transparent m-0 p-0 px-2">
                      <FontAwesomeIcon 
                        icon={faQuestionCircle} 
                        size="sm"
                      />
                    </button>
                  </Tooltip>
                </Form.Label>
                <Form.Select
                  id="language"
                  name="language"
                  style={{color: (language == "") ? '#969696':'black'}}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option style={{color: '#555'}}>Idioma do arquivo</option>
                  <option value="english">English (USA)</option>
                  <option value="portuguese">Português (Brasil)</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>              
              {error && <p className="text-danger">{error}</p>}
              <Button variant="secondary" className="d-flex flex-row align-items-center" type="submit">
                  {!loading? 
                    <>
                      <p className="p-0 m-0 me-2">Enviar</p>
                      <FontAwesomeIcon className="p-0 m-0" icon={faUpload} size="1x"/>
                    </> : 
                    <LoadingSpinnerComponent />
                  }
                </Button>
            </Modal.Footer>
          </Form>
        </Modal>
    );
  }
)
