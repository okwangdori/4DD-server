import { interviewBaseResponseDto } from "../interfaces/common/interviewBaseResponseDto";
import { interviewCreateDto } from "../interfaces/interview/interviewCreateDto";
import { interviewResponseDto } from "../interfaces/interview/interviewResponseDto";
import { interviewUpdateDto } from "../interfaces/interview/interviewUpdateDto";
import Interview from "../models/Interview";
import logger from "../log/logger";

const createInterview = async (
  interviewCreateDto: interviewCreateDto
): Promise<interviewBaseResponseDto> => {
  try {
    // const interview = new Interview({
    //     main_category: interviewCreateDto.main_category,
    //     main_category_code: interviewCreateDto.main_category_code,
    //     middle_category: interviewCreateDto.middle_category,
    //     middle_category_code: interviewCreateDto.middle_category_code,
    //     sub_category: interviewCreateDto.sub_category,
    //     sub_category_code: interviewCreateDto.sub_category_code,
    //     multiple_choice: interviewCreateDto.multiple_choice;
    //     sub_category_contents: interviewCreateDto.sub_category_contents,
    //     interview_answer: interviewCreateDto.interview_answer;
    //     answer_example: interviewCreateDto.answer_example;
    //     useYN: interviewCreateDto.useYN,
    // });
    const interview = new Interview(interviewCreateDto);

    await interview.save();

    const data = {
      _id: interview.id,
    };

    return data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// const autoIncObjectId = (seqName : string) => {

//   var autoInc = Interview.seq.findAndModify({
//       query: {_id: seqName },
//       update: { $inc: {seq_value:1}},
//       new: true
//   });
//   return autoInc.seq_value;
// }

const updateInterview = async (
  interviewId: string,
  interviewUpdateDto: interviewUpdateDto
): Promise<interviewUpdateDto | null> => {
  try {
    await Interview.findByIdAndUpdate(interviewId, interviewUpdateDto); // update 로직
    const interview = await findInterviewById(interviewId); // update 된 정보를 불러오는 로직
    // null이 될 경우를 처리해줘야 한다.
    if (!interview) {
      return null;
    }
    return interview;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findInterviewById = async (
  interviewId: string
): Promise<interviewResponseDto | null> => {
  try {
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return null;
    }
    return interview;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAllInterviewById = async () => {
  try {
    let interview = await Interview.find()
      .sort({ dateTimeOfPosting: -1 })
      .exec();

    let list: any[] = [];

    if (!interview) {
      return null;
    }

    return interview;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteInterview = async (
  interviewId: string
): Promise<interviewResponseDto | null> => {
  try {
    const interview = await Interview.findByIdAndDelete(interviewId);
    if (!interview) {
      return null;
    }
    return interview;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  createInterview,
  updateInterview,
  findInterviewById,
  //   findInterviewAll,
  findAllInterviewById,
  deleteInterview,
};
