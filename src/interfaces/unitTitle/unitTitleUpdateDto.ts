// interfaces/unitTitle/unitTitleUpdateDto.ts -> update 용
import mongoose from "mongoose";

export interface unitTitleUpdateDto {
    _id: mongoose.Schema.Types.ObjectId;
    title?: string;
    content?: string;
    additional?: {
        category: string;
        category_number: number;
    };
}