import { WordCloudType } from "../types/wordcloud.types";
import { TasksType } from "../types/tasks.types";
import { BaseResponseType } from "../types/baseresponse.type";
import api from "./api";


export class WordCloudService  {
    static async create(datafile_id: string): Promise<BaseResponseType & {create_wc_task_id: string}>{
        return await api.post(`/wordcloud/${datafile_id}`);
    }

    static async get(datafile_id: string): Promise<WordCloudType>{
        return await api.get(`/wordcloud/${datafile_id}`);
    }

    static async delete(datafile_id: string): Promise<BaseResponseType & {deleted: boolean}>{
        return await api.delete(`/wordcloud/${datafile_id}`);
    }

    static async getTasks(datafile_id: string): Promise<TasksType>{
        return await api.get(`/wordcloud/${datafile_id}/tasks`);
    }

}