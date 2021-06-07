import {BaseService} from "./base.service";
import { DataFileType } from "../types/datafiles.types";
import { TasksType } from "../types/tasks.types";
import { BaseResponseType } from "../types/baseresponse.type";


export default class DataFilesService extends BaseService{


  get(datafile_id: string) : Promise<DataFileType> 
  {
    return this.api.get(`/datafile/${datafile_id}`);
  }

  list(orderBy: string, orderAscending: boolean): Promise<BaseResponseType & {total: number, documents: DataFileType[]}> 
  {
    return this.api.get("/datafile", {
      params: {
        orderby: orderBy,
        order_ascending: orderAscending,
      },
    });
  }

  delete(id: string) : Promise<BaseResponseType & {deleted: boolean}>
  {
    return this.api.delete(`/datafile/${id}`);
  }

  upload(file: string | Blob, format: string, textColumn: string, 
    language: string, separador: string) : Promise<BaseResponseType & {id: string }>  
  {
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

  getTasks(id: string): Promise<TasksType> 
  {
    return this.api.get(`/datafile/${id}/tasks`)
  }
  
}
