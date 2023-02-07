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
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const services_1 = require("../services");
const createInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interviewCreateDto = req.body;
    try {
        const data = yield services_1.interviewService.createInterview(interviewCreateDto);
        let resultData = null;
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_INTERVIEW_SUCCESS, resultData));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interviewUpdateDto = req.body;
    const { interviewId } = req.params;
    let titleData = null;
    let resultArr = [];
    try {
        const data = yield services_1.interviewService.updateInterview(interviewId, interviewUpdateDto);
        resultArr.push(titleData);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_INTERVIEW_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findInterviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interviewId } = req.params;
    try {
        const data = yield services_1.interviewService.findInterviewById(interviewId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_INTERVIEW_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findAllInterviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.interviewService.findAllInterviewById();
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_INTERVIEW_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interviewId } = req.params;
    try {
        const data = yield services_1.interviewService.deleteInterview(interviewId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DELETE_INTERVIEW_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
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
//# sourceMappingURL=interviewController.js.map