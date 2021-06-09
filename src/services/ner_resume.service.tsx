import { BaseResponseType } from "../types/baseresponse.type";
import { NerResumePaginationType, NerResumeType } from "../types/ner.types";
import { TasksType } from "../types/tasks.types";
import { BaseService } from "./base.service";

export class NerResumeService extends BaseService {
    create(datafile_id: string): Promise<BaseResponseType & {create_ner_resume_task_id: string}>{
        return this.api.post(`/ner/${datafile_id}`);
    }

    get(datafile_id: string, pagination: NerResumePaginationType) : Promise<NerResumeType> {
        return this.api.get(
            `/ner/${datafile_id}?` +
                `skip=${pagination.skip}&` + 
                `limit=${pagination.limit}&` + 
                `order_by=${pagination.orderBy}&` + 
                `order_ascending=${pagination.orderAscending}`
        );
    }

    delete(datafile_id: string) : Promise<BaseResponseType & {deleted: boolean}> {
        return this.api.delete(`/ner/${datafile_id}`);
    }

    getTasks(datafile_id: string): Promise<TasksType>{
        return this.api.get(`/ner/${datafile_id}/tasks`);
    }

}