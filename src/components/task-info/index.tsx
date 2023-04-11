import React from 'react';
import { TaskType } from '../../types/tasks.types';

import { WaitingSpinnerComponent } from '../waiting';
import { LoadingSpinnerComponent } from '../loading';

interface ITaskInfoProps {
    task: TaskType
    title: string

}

export function TaskInfoComponent({task, title}: ITaskInfoProps) {

    const renderTaskStatus = () =>{
        switch(task.status){
            case "success":
                return (
                    <p className='fs-5 text-capitalize mx-auto my-1 p-0 border-0'>
                        Concluído!
                    </p>
                );
            case "queued":
                return (
                    <>
                        <p className='fs-5 text-capitalize mx-auto my-1 p-0 border-0'>
                            Na fila
                        </p>                        
                        <WaitingSpinnerComponent />
                    </>                    
                );
            case "in_progress":
                return (
                    <>
                        <p className='fs-5 text-capitalize mx-auto my-1 p-0 border-0 '>
                            Processando
                        </p>
                        <LoadingSpinnerComponent />
                    </>
                );
            case "error":
                return (
                    <p className='fs-5 text-capitalize mx-auto my-1 p-0 border-0 text-danger'>
                        Ocorreu um erro!
                    </p>
                );
            default: 
            return (
                <p className='fs-5 text-capitalize mx-auto my-1 p-0 border-0 text-danger'>
                    Status inesperado!
                </p>
            );
        }
    }

    return (
        <div className="d-flex row w-100 m-0 mt-4 p-4 text-light">
            <p className='fs-5 text-capitalize text-center mx-auto my-1 p-0 border-0'>{title}</p>
            <div className="d-flex align-items-center">                
                {renderTaskStatus()}
            </div>
            {
                (task.status === 'in_progress') &&
                <p className='fs-6 text-capitalize text-center mx-auto my-1 p-0 border-0'>Progresso: {task.progress}/{task.total}</p>
            }
            {task.error && <p className="text-danger">{task.error}</p>}            
        </div>
    );
}



