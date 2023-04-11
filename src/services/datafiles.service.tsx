import { DataFileType } from "../types/datafiles.types";
import { TasksType } from "../types/tasks.types";
import { BaseResponseType } from "../types/baseresponse.type";
import api from "./api";


export default class DataFilesService {

  static async get(datafile_id: string) : Promise<DataFileType> 
  {
    return await api.get(`/datafile/${datafile_id}`);
  }

  static async list(orderBy: string, orderAscending: boolean): Promise<BaseResponseType & {total: number, documents: DataFileType[]}> 
  {
    return await api.get("/datafile", {
      params: {
        orderby: orderBy,
        order_ascending: orderAscending,
      },
    });
  }

  static async delete(id: string) : Promise<BaseResponseType & {deleted: boolean}>
  {
    return await api.delete(`/datafile/${id}`);
  }

  static async upload(file: string | Blob, format: string, textColumn: string, 
    language: string, separador: string) : Promise<BaseResponseType & {id: string }>  
  {
    const formData = new FormData();
    formData.append("file", file);

    return await api.post("/datafile", formData, {
      params: {
        format,
        language,
        separador,
        text_column: textColumn,
      },
    });
  }

  static async getTasks(id: string): Promise<TasksType> 
  {
    return await api.get(`/datafile/${id}/tasks`)
  }
  
}
