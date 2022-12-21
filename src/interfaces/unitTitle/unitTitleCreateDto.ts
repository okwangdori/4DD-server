import mongoose from "mongoose";

// interfaces/unitTitle/unitTitleCreateDto.ts -> create 용
export interface unitTitleCreateDto {
    title: string;
    content: string;
    category: string;
    category_number: number;
    menu_level : number;
    menu_id: string;
    parents_menu_id : string;
    useYN : string;
    parent : mongoose.Schema.Types.ObjectId;
    children: [mongoose.Schema.Types.ObjectId];
}