import mongoose from "mongoose";

export interface userSubInfoCreateDto {
  views: [
    {
      progress_rate?: Number;
      unit?: mongoose.Schema.Types.ObjectId;
    }?
  ];
  likes?: [mongoose.Schema.Types.ObjectId];
  unit_total_count: Number;
  dateTimeOfViews?: Date;
}
