// interfaces/post/PostCreateDto.ts -> create 용
export interface postCreateDto {
    userName: string;
    title: string;
    content: string;
    dateTimeOfPosting: Date;
    additional?: {
        category: string;
        season: string;
    };
}