import React from 'react';
import { TaskType } from '../../types/tasks.types';

import styles from "./styles.module.scss";
import { WaitingSpinnerComponent } from '../waiting';
import { LoadingSpinnerComponent } from '../loading';

interface ITaskInfoProps {
    task: TaskType
}

export function TaskInfoComponent({task}: ITaskInfoProps) {

    const renderTaskStatus = () =>{
        switch(task.status){
            case "success":
                return (
                    <p className={styles.status}>
                        Concluído!
                    </p>
                );
            case "queued":
                return (
                    <>
                        <p className={styles.status}>
                            Na fila
                        </p>                        
                        <WaitingSpinnerComponent />
                    </>                    
                );
            case "in_progress":
                return (
                    <>
                        <p className={styles.status}>
                            Processando
                        </p>
                        <LoadingSpinnerComponent />
                    </>
                );
            case "error":
                return (
                    <p className={styles.status}>
                        Ocorreu um erro!
                    </p>
                );
            default: 
            return (
                <p className={styles.status + ' error'}>
                    Status inesperado!
                </p>
            );
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Status do ultimo processamento</p>
            <div className={styles.header}>                
                <p>Construindo um novo wordcloud:</p>
                {renderTaskStatus()}
            </div>
            {
                (task.status === 'in_progress') &&
                <p>Progresso: {task.progress}/{task.total}</p>
            }
            {task.error && <p className={"error " + styles.error}>{task.error}</p>}            
        </div>
    );
}



