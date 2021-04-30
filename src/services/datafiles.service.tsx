import api from "./api.service";
import { AxiosInstance } from "axios";
import { DataFileType } from "../types/datafiles.types";

export default class DataFilesService {
  api: AxiosInstance;

  constructor() {
    this.api = api;
  }

  list(orderBy: string, orderAscending: boolean) : Promise<{total: number, documents: Array<DataFileType>}> {
    return this.api.get("/datafile", {
      params: {
        orderby: orderBy,
        order_ascending: orderAscending,
      },
    });
  }

  delete(id: string) : Promise<{deleted: boolean}>{
    return this.api.delete("/datafile", {
      params: {
        datafile_id: id,
      },
    });
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
}
