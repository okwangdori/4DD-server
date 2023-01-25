import mongoose from "mongoose";
// interfaces/unitTitle/unitTitleInfo.ts -> model 정의 용도
export interface unitTitleInfo {
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
