import { BaseResponseType } from "../types/baseresponse.type";
import { NGramsType } from "../types/ngrams.types";
import { TasksType } from "../types/tasks.types";
import { BaseService } from "./base.service";

export class NGramService extends BaseService {
    create(datafile_id: string, size: number): Promise<BaseResponseType & {create_ngrams_task_id: string}>{
        return this.api.post(`/ngrams/${datafile_id}?size=${size}`);
    }

    get (datafile_id: string) : Promise<NGramsType> {
        return this.api.get(`/ngrams/${datafile_id}`);        
    }

    delete(datafile_id: string): Promise<BaseResponseType & {deleted: boolean}> {
        return this.api.delete(`/ngrams/${datafile_id}`);
    }

    getTasks(datafile_id: string): Promise<TasksType> {
        return this.api.get(`/ngrams/${datafile_id}/tasks`);
    }
}