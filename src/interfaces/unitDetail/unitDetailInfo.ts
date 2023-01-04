import mongoose from "mongoose";

export interface unitDetailInfo {
  parent_title_id: mongoose.Schema.Types.ObjectId;
  title: string;
  detail_content: string;
  useYN?: string;
  dateTimeOfPosting?: Date;
}
