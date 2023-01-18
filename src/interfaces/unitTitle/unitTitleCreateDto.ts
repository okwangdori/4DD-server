import mongoose from "mongoose";

// interfaces/unitTitle/unitTitleCreateDto.ts -> create 용
export interface unitTitleCreateDto {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: mongoose.Schema.Types.ObjectId;
  category: string;
  category_number: number;
  parent_unit_id: mongoose.Schema.Types.ObjectId;
  menu_level: number;
  useYN: string;
  title_image_path: string;
}
