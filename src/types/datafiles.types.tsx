import { BaseResponseType } from "./baseresponse.type";

export interface DataFileType extends BaseResponseType {
    id: string;
    name: string;
    language: string;
    text_column?: string | null;
    created_at: Date;
}