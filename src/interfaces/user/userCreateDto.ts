// interfaces/user/UserCreateDto.ts -> create 용
export interface userCreateDto {
    title: string;
    content: string;
    additional?: {
        category: string;
        season: string;
    };
}