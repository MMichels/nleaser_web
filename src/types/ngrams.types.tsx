import { BaseResponseType } from "./baseresponse.type";

export interface NGramType {
    content: string;
    count: number;
    relevance: number;
}

export interface NGramsType extends BaseResponseType {
    created_at: string;
    ngrams: NGramType[];
    total: number;
    size: number;
}

export class NGramsPaginationType {
    skip: number;
    limit: number;
    orderBy: "content" | "count" | "relevance";
    orderAscending: 0 | 1;

    constructor(){
        this.orderBy = "relevance";
        this.orderAscending = 0;
        this.skip = 0;
        this.limit = 10;
    }
}