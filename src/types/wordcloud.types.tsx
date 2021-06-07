import { BaseResponseType } from "./baseresponse.type";

export interface WordCloudType extends  BaseResponseType {
    base64_image: string;
    created_at: string;
}