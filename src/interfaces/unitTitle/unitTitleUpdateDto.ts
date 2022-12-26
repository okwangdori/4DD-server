// interfaces/unitTitle/unitTitleUpdateDto.ts -> update 용
import mongoose from "mongoose";

export interface unitTitleUpdateDto {
  _id: mongoose.Schema.Types.ObjectId;
  title?: string;
  content?: string;
  category?: string;
  category_number?: number;
  menu_level?: number;
  menu_id?: string;
  parents_menu_id?: string;
  useYN?: string;
  parent?: mongoose.Schema.Types.ObjectId;
  children?: [mongoose.Schema.Types.ObjectId];
  selectedList?: any[];
}
