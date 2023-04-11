import { BaseResponseType } from "../types/baseresponse.type";
import { NGramsPaginationType, NGramsType } from "../types/ngrams.types";
import { TasksType } from "../types/tasks.types";
import api from "./api";

export class NGramService {
    static async create(datafile_id: string, size: number): Promise<BaseResponseType & {create_ngrams_task_id: string}>{
        return await api.post(`/ngrams/${datafile_id}?size=${size}`);
    }

    static async get (datafile_id: string, pagination: NGramsPaginationType) : Promise<NGramsType> {
        return await api.get(
            `/ngrams/${datafile_id}?` + 
                `skip=${pagination.skip}&` + 
                `limit=${pagination.limit}&` + 
                `order_by=${pagination.orderBy}&` + 
                `order_ascending=${pagination.orderAscending}`
        );        
    }

    static async delete(datafile_id: string): Promise<BaseResponseType & {deleted: boolean}> {
        return await api.delete(`/ngrams/${datafile_id}`);
    }

    static async getTasks(datafile_id: string): Promise<TasksType> {
        return await api.get(`/ngrams/${datafile_id}/tasks`);
    }
}