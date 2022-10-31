// interfaces/post/PostCreateDto.ts -> create 용
export interface postCreateDto {
    title: string;
    content: string;
    additional?: {
        category: string;
        season: string;
    };
}