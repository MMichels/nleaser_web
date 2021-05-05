import React from 'react';
import styles from "./styles.module.scss";

import WaitingGif from "../../assets/gifs/waiting.gif";



export const WaitingSpinnerComponent = () => {
    return (
        <img className={styles.waitingSpinner} 
            src={WaitingGif}
            alt="aguardando"
        >
        </img>
    );
};