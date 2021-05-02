import { BaseResponseType } from "./baseresponse.type";

export interface TaskType {
    id: string;
    created_at: string;
    status: string;
    total: number;
    progress: number;
    error: string;
}


export interface TasksType extends BaseResponseType{
    total: number;
    failed: number;
    tasks: Array<TaskType>;
}