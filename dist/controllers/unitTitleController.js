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
const createUnitTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unitTitleCreateDto = req.body;
    try {
        const data = yield services_1.unitTitleService.createUnitTitle(unitTitleCreateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateUnitTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unitTitleUpdateDto = req.body;
    const { unitTitleId } = req.params;
    try {
        const data = yield services_1.unitTitleService.updateUnitTitle(unitTitleId, unitTitleUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateUnitTitleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const unitTitleUpdateDto = req.body;
    const { unitTitleId } = req.params;
    try {
        const data = yield services_1.unitTitleService.updateUnitTitleTree(unitTitleId, unitTitleUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findUnitTitleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unitTitleId } = req.params;
        const data = yield services_1.unitTitleService.findUnitTitleById(unitTitleId);
        let resultData = null;
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
const findUnitTitleAndDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unitTitleId } = req.params;
        const data = yield services_1.unitTitleService.findUnitTitleAndDetailById(unitTitleId);
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
const findUnitTitleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { unitTitleId } = req.params;
    try {
        const data = yield services_1.unitTitleService.findUnitTitleTree(unitTitleId);
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
const findUnitTitleAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.unitTitleService.findUnitTitleAll();
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
const deleteUnitTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { unitTitleId } = req.params;
    try {
        const data = yield services_1.unitTitleService.deleteUnitTitle(unitTitleId);
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
const deleteUnitTitleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.unitTitleService.deleteUnitTitleTree(req.body.selectedList);
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
    createUnitTitle,
    updateUnitTitle,
    updateUnitTitleTree,
    findUnitTitleById,
    findUnitTitleAndDetailById,
    findUnitTitleTree,
    findUnitTitleAll,
    deleteUnitTitle,
    deleteUnitTitleTree,
};
//# sourceMappingURL=unitTitleController.js.map