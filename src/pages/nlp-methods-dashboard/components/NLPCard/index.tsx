import React, { Component } from 'react';
import Modal from "react-modal";

import styles from "./styles.module.scss";
import modalStyles from "../../../../styles/modalStyles.module.scss";


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

    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);       
    }

    openModal(e: React.MouseEvent){
        e.preventDefault();
        this.setState({modalIsOpen: true});
    }

    closeModal(e: React.MouseEvent){
        e.preventDefault();
        this.setState({modalIsOpen: false})
    }

    render() {
        return (
            <li className={styles.nlpCard} key={this.props.name}>
                <button className={"fill-div"} onClick={this.openModal}>
                    <h1 className={styles.title}>{this.props.name}</h1>
                    <hr />
                    <p className={styles.description}>
                        {this.props.description}
                    </p>                    
                </button>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel={this.props.contentLabel}
                    className={modalStyles.nlpModal}
                    overlayClassName={modalStyles.overlayModal}
                    closeTimeoutMS={500}
                >
                    {this.props.children}
                </Modal>
            </li>
        );
    }
}
