export interface BaseResponseType{
    status: string;
    error?: string;
    messages?: Array<Map<string, string>>;
}