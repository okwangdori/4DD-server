import mongoose from "mongoose";

export interface userSubInfoDto {
  views: [
    {
      progress_rate: Number;
      unit: mongoose.Schema.Types.ObjectId;
    }
  ];
  likes: [mongoose.Schema.Types.ObjectId];
  unit_total_count: Number;
  dateTimeOfViews: Date;
}
