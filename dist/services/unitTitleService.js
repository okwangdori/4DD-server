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
const logger_1 = __importDefault(require("../log/logger"));
const createUnitTitle = (unitTitleCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // create를 위해 각 filed명에 값들을 할당시켜준다.
        const unitTitle = new UnitTitle_1.default({
            title: unitTitleCreateDto.title,
            content: unitTitleCreateDto.content,
            additional: {
                category: (_a = unitTitleCreateDto.additional) === null || _a === void 0 ? void 0 : _a.category,
                category_number: (_b = unitTitleCreateDto.additional) === null || _b === void 0 ? void 0 : _b.category_number,
            }
        });
        yield unitTitle.save();
        const data = {
            _id: unitTitle.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateUnitTitle = (unitTitleId, unitTitleUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UnitTitle_1.default.findByIdAndUpdate(unitTitleId, unitTitleUpdateDto); // update 로직
        const unitTitle = yield findUnitTitleById(unitTitleId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findUnitTitleById = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitTitle = yield UnitTitle_1.default.findById(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findUnitTitleAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // const unitTitle = await UnitTitle.find({}, function (err:any, data:any) {
    //     if (!err) {
    //         res.render("unitTitle", { "unitTitle": data });
    //     } else {
    //         throw err;
    //     }
    // }).clone().catch(function(err){ console.log(err)});
    // return unitTitle;
    // ctx.body = posts
    // .map(post => post.toJSON())
    // .map(post => ({
    //   ...post,
    //   body: removeHtmlAndShorten(post.body),
    // }));
    try {
        var unitTitle = yield UnitTitle_1.default.find({});
        var test;
        if (!unitTitle) {
            return null;
        }
        else {
            test = unitTitle.map(unitTitle => unitTitle.toJSON()).map(unitTitle => (Object.assign({}, unitTitle)));
        }
        return test;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const deleteUnitTitle = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitTitle = yield UnitTitle_1.default.findByIdAndDelete(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createUnitTitle,
    updateUnitTitle,
    findUnitTitleById,
    findUnitTitleAll,
    deleteUnitTitle,
};
//# sourceMappingURL=unitTitleService.js.map