import mongoose from "mongoose";
import { unitDetailInfo } from "../interfaces/unitDetail/unitDetailInfo";

const { Schema } = mongoose;

const UnitDetailSchema = new mongoose.Schema({
  parent_title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnitTitle",
  },
  title: {
    type: String,
    required: true,
  },
  detail_content: {
    type: String,
    required: true,
  },
  useYN: {
    type: String,
    required: true,
    default: "Y",
  },
  dateTimeOfPosting: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<unitDetailInfo & mongoose.Document>(
  "UnitDetail",
  UnitDetailSchema
);
