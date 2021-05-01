import React, { Component } from 'react';

import styles from "./styles.module.scss";
import modalStyles from "../../../../styles/modalStyles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IWordCloudModalProps {
    onRequestClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }

export class WordCloudModal extends Component<IWordCloudModalProps> {
    render() {
        return (
            <div className={styles.container}>
                <div className={modalStyles.modalHeader}>
                    <p className={modalStyles.modalTitle}>
                        Wordcloud
                    </p>
                    <button className={modalStyles.closeModalButton} onClick={this.props.onRequestClose}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>                
                <p className={modalStyles.modalDescription}>
                    Método de análise desenvolvido para gerar uma representação visual de dados de textuais, 
                    aonde, as palavras mais relevantes no seu conjunto de texto, terão um tamanho de fonte maior
                </p>                
            </div>
        );
    }
}

