import React, { Component, useState, ReactNode } from 'react';
import Modal from "react-modal";

import styles from "./styles.module.scss";
import modalStyles from "../../../../styles/modalStyles.module.scss";
import { DataFileType } from '../../../../types/datafiles.types';


interface INLPCardComponentProps {    
    name: string;
    description: string;
    imgSrc:string;
    imgAlt:string;
    contentLabel:string;
}

interface INLPCardComponentState {
    modalIsOpen: boolean;
}

export class NLPCardComponent extends Component<INLPCardComponentProps, INLPCardComponentState> {

    state = {
        modalIsOpen: false
    }

    render() {
        return (
            <li className={styles.nlpCard} key={this.props.name}>
                <button className={"fill-div"}>
                    <h1 className={styles.title}>{this.props.name}</h1>
                    <hr />
                    <img className={styles.background} 
                            src={this.props.imgSrc}
                            alt={this.props.imgAlt}
                    />
                    <p className={styles.description}>
                        {this.props.description}
                    </p>  
                </button>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.setState({modalIsOpen: false})}
                    contentLabel={this.props.contentLabel}
                    className={modalStyles.defaultModal}
                    overlayClassName={modalStyles.overlayModal}
                    closeTimeoutMS={500}
                >
                    {this.props.children}
                </Modal>
            </li>
        );
    }
}
