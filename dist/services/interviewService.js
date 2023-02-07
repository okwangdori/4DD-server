"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interview_1 = __importDefault(require("../models/Interview"));
const logger_1 = __importDefault(require("../log/logger"));
const createInterview = (interviewCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
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
        const interview = new Interview_1.default(interviewCreateDto);
        yield interview.save();
        const data = {
            _id: interview.id,
        };
        return data;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
// const autoIncObjectId = (seqName : string) => {
//   var autoInc = Interview.seq.findAndModify({
//       query: {_id: seqName },
//       update: { $inc: {seq_value:1}},
//       new: true
//   });
//   return autoInc.seq_value;
// }
const updateInterview = (interviewId, interviewUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Interview_1.default.findByIdAndUpdate(interviewId, interviewUpdateDto); // update 로직
        const interview = yield findInterviewById(interviewId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!interview) {
            return null;
        }
        return interview;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findInterviewById = (interviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interview = yield Interview_1.default.findById(interviewId);
        if (!interview) {
            return null;
        }
        return interview;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findAllInterviewById = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let interview = yield Interview_1.default.find()
            .sort({ dateTimeOfPosting: -1 })
            .exec();
        let list = [];
        if (!interview) {
            return null;
        }
        return interview;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const deleteInterview = (interviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interview = yield Interview_1.default.findByIdAndDelete(interviewId);
        if (!interview) {
            return null;
        }
        return interview;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.default = {
    createInterview,
    updateInterview,
    findInterviewById,
    //   findInterviewAll,
    findAllInterviewById,
    deleteInterview,
};
//# sourceMappingURL=interviewService.js.map