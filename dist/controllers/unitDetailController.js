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
const createUnitDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unitDetailCreateDto = req.body;
    let unitTitleCreateDto = req.body;
    try {
        const data = yield services_1.unitDetailService.createUnitDetail(unitDetailCreateDto);
        let resultData = null;
        if (data._id) {
            unitTitleCreateDto.content = data._id;
            resultData = yield services_1.unitTitleService.createUnitTitle(unitTitleCreateDto);
        }
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_UNIT_DETAIL_SUCCESS, resultData));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateUnitDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unitDetailUpdateDto = req.body;
    const unitTitleUpdateDto = req.body;
    const { unitDetailId } = req.params;
    let titleData = null;
    let resultArr = [];
    try {
        const data = yield services_1.unitDetailService.updateUnitDetail(unitDetailId, unitDetailUpdateDto);
        if (data) {
            resultArr.push(data);
            titleData = yield services_1.unitTitleService.updateUnitTitle(JSON.stringify(unitDetailUpdateDto.parent_title_id), unitTitleUpdateDto);
        }
        resultArr.push(titleData);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, resultArr));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findUnitDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { unitDetailId } = req.params;
    try {
        const data = yield services_1.unitDetailService.findUnitDetailById(unitDetailId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findUnitDetailAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.unitDetailService.findUnitDetailAll();
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteUnitDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { unitDetailId } = req.params;
    try {
        const data = yield services_1.unitDetailService.deleteUnitDetail(unitDetailId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DELETE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createUnitDetail,
    updateUnitDetail,
    findUnitDetailById,
    findUnitDetailAll,
    deleteUnitDetail,
};
//# sourceMappingURL=unitDetailController.js.map