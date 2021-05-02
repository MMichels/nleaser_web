import React from 'react';
import { TaskType } from '../../types/tasks.types';

interface ITaskInfoProps {
    task: TaskType
}

export function TaskInfoComponent({task}: ITaskInfoProps) {
    return (
        <div>
            <h3>{task.status}</h3>
            <h2>Progresso: {task.progress}/{task.total}</h2>
            {task.error && <p className="error">{task.error}</p>}            
        </div>
    );
}



