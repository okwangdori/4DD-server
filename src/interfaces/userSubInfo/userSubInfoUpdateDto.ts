import mongoose from "mongoose";

export interface userSubInfoUpdateDto {
  _id: mongoose.Schema.Types.ObjectId;
  views?: [
    {
      progress_rate?: Number;
      unit?: mongoose.Schema.Types.ObjectId;
    }?
  ];
  likes?: [mongoose.Schema.Types.ObjectId];
  unit_total_count?: Number;
  dateTimeOfViews?: Date;
}
