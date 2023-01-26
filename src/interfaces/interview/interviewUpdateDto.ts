import mongoose from "mongoose";

export interface interviewUpdateDto {
  main_category?: string;
  main_category_code?: number;
  middle_category?: string;
  middle_category_code?: number;
  sub_category?: string;
  sub_category_code?: number;
  multiple_choice?: boolean;
  interview_contents?: string;
  interview_answer?: string;
  answer_example?: any[];
  useYN?: string;
  dateTimeOfPosting?: Date;
}
