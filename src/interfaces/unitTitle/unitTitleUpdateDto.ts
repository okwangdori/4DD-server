// interfaces/unitTitle/unitTitleUpdateDto.ts -> update 용
import mongoose from "mongoose";

export interface unitTitleUpdateDto {
  _id: mongoose.Schema.Types.ObjectId;
  title?: string;
  content?: mongoose.Schema.Types.ObjectId;
  category?: string;
  category_number?: number;
  parent_unit_id?: mongoose.Schema.Types.ObjectId;
  menu_level?: number;
  useYN?: string;
  title_image_path?: string;
  selectedList?: any[];
}
