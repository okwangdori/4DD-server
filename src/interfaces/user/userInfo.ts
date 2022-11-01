// interfaces/user/UserInfo.ts -> model 정의 용도
export interface userInfo {
    title: string;
    content: string;
    additional: {
        category: string;
        season: string;
    };
}