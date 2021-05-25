import { BaseResponseType } from "./baseresponse.type";

export interface NGramType {
    word: string;
    count: number;
}

export interface NGramsType extends BaseResponseType {
    N: number; // Representa o Numero de Grams (NGrams)
    created_at: string;
    content: NGramType[];

}