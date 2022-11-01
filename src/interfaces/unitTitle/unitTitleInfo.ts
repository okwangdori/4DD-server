// interfaces/unitTitle/unitTitleInfo.ts -> model 정의 용도
export interface unitTitleInfo {
    title: string;
    content: string;
    additional: {
        category: string;
        category_number: number;
    };
}