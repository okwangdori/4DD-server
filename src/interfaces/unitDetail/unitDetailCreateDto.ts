import mongoose from "mongoose";

export interface unitDetailCreateDto {
  parent_title_id: mongoose.Schema.Types.ObjectId;
  title: string;
  detail_content: string;
  useYN?: string;
  dateTimeOfPosting?: Date;
}
