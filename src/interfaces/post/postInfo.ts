// interfaces/post/PostInfo.ts -> model 정의 용도
export interface postInfo {
    title: string;
    content: string;
    additional: {
        category: string;
        season: string;
    };
}