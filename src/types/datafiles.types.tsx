export interface DataFileType {
    id: string;
    name: string;
    language: string;
    text_column?: string | null;
    created_at: Date;
}