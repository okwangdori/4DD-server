import mongoose from "mongoose";

export interface unitDetailUpdateDto {
  _id: mongoose.Schema.Types.ObjectId;
  parent_title_id?: mongoose.Schema.Types.ObjectId;
  title?: string;
  detail_content?: string;
  useYN?: string;
  dateTimeOfPosting?: Date;
  parent_id?: string;
}
