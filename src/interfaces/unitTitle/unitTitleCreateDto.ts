// interfaces/unitTitle/unitTitleCreateDto.ts -> create 용
export interface unitTitleCreateDto {
    title: string;
    content: string;
    additional?: {
        category: string;
        category_number: number;
    };
}