// interfaces/post/PostUpdateDto.ts -> update 용
import mongoose from "mongoose";

export interface postUpdateDto {
    userName?: string;
    title?: string;
    content?: string;
    dateTimeOfPosting?: any;
    additional?: {
        category: string;
        season: string;
    };
}