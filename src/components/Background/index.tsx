import React from 'react'
import styles from './styles.module.scss';

export const BackgroundComponent = function (props: { children: React.ReactNode; }) {
    return (
        <div className={styles.backgroundStyled}>
            {props.children}
        </div>
    )
}
