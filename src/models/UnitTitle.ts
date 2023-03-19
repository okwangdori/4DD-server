import mongoose from "mongoose";
import { unitTitleInfo } from "../interfaces/unitTitle/unitTitleInfo";

const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitDetail",
    },
    category: {
      type: String,
      required: true,
    },
    category_number: {
      type: Number,
      required: true,
    },
    parent_unit_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    menu_level: {
      type: Number,
      required: true,
      default: 1,
    },
    useYN: {
      type: String,
      required: true,
      default: "Y",
    },
    title_image_path: {
      type: String,
    },
    dateTimeOfUnitTitleCreating: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

UnitSchema.virtual("unitTitles", {
  ref: "UnitTitle",
  localField: "_id",
  foreignField: "parent",
});

export default mongoose.model<unitTitleInfo & mongoose.Document>(
  "UnitTitle",
  UnitSchema
);
