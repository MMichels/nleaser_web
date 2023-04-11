import { BaseResponseType } from "../types/baseresponse.type";
import { NerResumePaginationType, NerResumeType } from "../types/ner.types";
import { TasksType } from "../types/tasks.types";
import api from "./api";

export class NerResumeService {
    static async create(datafile_id: string): Promise<BaseResponseType & {create_ner_resume_task_id: string}>{
        return await api.post(`/ner/${datafile_id}`);
    }

    static async get(datafile_id: string, pagination: NerResumePaginationType) : Promise<NerResumeType> {
        return await api.get(
            `/ner/${datafile_id}?` +
                `skip=${pagination.skip}&` + 
                `limit=${pagination.limit}&` + 
                `order_by=${pagination.orderBy}&` + 
                `order_ascending=${pagination.orderAscending}`
        );
    }

    static async delete(datafile_id: string) : Promise<BaseResponseType & {deleted: boolean}> {
        return await api.delete(`/ner/${datafile_id}`);
    }

    static async getTasks(datafile_id: string): Promise<TasksType>{
        return await api.get(`/ner/${datafile_id}/tasks`);
    }
}