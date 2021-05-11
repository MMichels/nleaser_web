import {BaseService} from "./base.service";
import { DataFileType } from "../types/datafiles.types";
import { TasksType } from "../types/tasks.types";

export default class DataFilesService extends BaseService{
  get(datafile_id: string) : Promise<DataFileType> {
    return this.api.get(`/datafile/${datafile_id}`);
  }

  list(orderBy: string, orderAscending: boolean) 
    : Promise<{total: number, documents: Array<DataFileType>}> {
    return this.api.get("/datafile", {
      params: {
        orderby: orderBy,
        order_ascending: orderAscending,
      },
    });
  }

  delete(id: string) : Promise<{deleted: boolean}>{
    return this.api.delete(`/datafile/${id}`);
  }

  upload(file: string | Blob, format: string, textColumn: string, 
    language: string, separador: string) : Promise<{id: string}>  {
    const formData = new FormData();
    formData.append("file", file);

    return this.api.post("/datafile", formData, {
      params: {
        format,
        language,
        separador,
        text_column: textColumn,
      },
    });
  }

  getTasks(id: string): Promise<TasksType> {
    return this.api.get(`/datafile/${id}/tasks`)
  }
  
}
