export interface BaseResponseType{
    status: string | null;
    error: string | null;
    messages: Array<Map<string, string>> | null;
}