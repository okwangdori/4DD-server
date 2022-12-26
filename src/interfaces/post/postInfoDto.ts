// interfaces/post/PostInfo.ts -> model 정의 용도
export interface postInfoDto {
    userName: string;
    title: string;
    content: string;
    dateTimeOfPosting: Date;
    additional?: {
        category: string;
        season: string;
    };
}