import api from "./api";

export default class DataFilesService {
  constructor() {
    this.api = api;
  }

  list(orderBy, orderAscending) {
    return this.api.get("/datafile", {
      params: {
        orderby: orderBy,
        order_ascending: orderAscending,
      },
    });
  }

  delete(id) {
    return this.api.delete("/datafile", {
      params: {
        datafile_id: id,
      },
    });
  }

  upload(file, format, textColumn, language, separador) {
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
