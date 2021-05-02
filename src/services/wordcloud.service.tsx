import { BaseService } from "./base.service";
import { WordCloudType } from "../types/wordcloud.types";
import { TasksType } from "../types/tasks.types";


export class WordCloudService extends BaseService {
    create(datafile_id: string): Promise<{create_wc_task_id: string}>{
        return this.api.post(`/wordcloud/${datafile_id}`);
    }

    get(datafile_id: string): Promise<WordCloudType>{
        return this.api.get(`/wordcloud/${datafile_id}`);
    }

    delete(datafile_id: string): Promise<{deleted: boolean}>{
        return this.api.delete(`/wordcloud/${datafile_id}`);
    }

    getTasks(datafile_id: string): Promise<TasksType>{
        return this.api.get(`/wordcloud/${datafile_id}/tasks`);
    }

}