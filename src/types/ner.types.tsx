import { BaseResponseType } from "./baseresponse.type";

export interface EntityType {
    content: string;
    entity: string;
    count: number;
}

export interface NerResumeType extends BaseResponseType {
    created_at: string;
    extracted_entities: EntityType[];
    total: number;
}

export class NerResumePaginationType {
    skip: number;
    limit: number;
    orderBy: "content" | "count" | "entity";
    orderAscending: 0 | 1;

    constructor(){
        this.orderBy = "count";
        this.orderAscending = 0;
        this.skip = 0;
        this.limit = 12;
    }
}