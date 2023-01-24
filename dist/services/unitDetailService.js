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
const UnitTitle_1 = __importDefault(require("../models/UnitTitle"));
const UnitDetail_1 = __importDefault(require("../models/UnitDetail"));
const logger_1 = __importDefault(require("../log/logger"));
const createUnitDetail = (unitDetailCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitDetail = new UnitDetail_1.default({
            title: unitDetailCreateDto.title,
            detail_content: unitDetailCreateDto.detail_content,
            useYN: unitDetailCreateDto.useYN,
        });
        yield unitDetail.save();
        const data = {
            _id: unitDetail.id,
        };
        return data;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const updateUnitDetail = (unitDetailId, unitDetailUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UnitDetail_1.default.findByIdAndUpdate(unitDetailId, unitDetailUpdateDto); // update 로직
        const unitDetail = yield findUnitDetailById(unitDetailId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!unitDetail) {
            return null;
        }
        return unitDetail;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findUnitDetailById = (unitDetailId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitDetail = yield UnitDetail_1.default.findById(unitDetailId);
        if (!unitDetail) {
            return null;
        }
        return unitDetail;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findUnitDetailAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let unitTitle = yield UnitTitle_1.default.find({ menu_level: 1 })
            .populate("children")
            .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
            .exec();
        let list = [];
        if (!unitTitle) {
            return null;
        }
        else {
            unitTitle.map((e, i) => {
                if (list[e.category_number]) {
                    list[e.category_number].push(e);
                }
                else {
                    list[e.category_number] = [];
                    list[e.category_number].push(e);
                }
            });
        }
        return list;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const deleteUnitDetail = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitTitle = yield UnitTitle_1.default.findByIdAndDelete(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.default = {
    createUnitDetail,
    updateUnitDetail,
    findUnitDetailById,
    findUnitDetailAll,
    deleteUnitDetail,
};
//# sourceMappingURL=unitDetailService.js.map