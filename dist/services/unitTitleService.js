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
const mongoose_1 = __importDefault(require("mongoose"));
const createUnitTitle = (unitTitleCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitTitle = new UnitTitle_1.default({
            title: unitTitleCreateDto.title,
            content: unitTitleCreateDto.content,
            category: unitTitleCreateDto.category,
            category_number: unitTitleCreateDto.category_number,
            parent_unit_id: unitTitleCreateDto.parent_unit_id,
            menu_level: unitTitleCreateDto.menu_level,
            useYN: unitTitleCreateDto.useYN,
        });
        yield unitTitle.save();
        const data = {
            _id: unitTitle.id,
        };
        return data;
    }
    catch (error) {
        logger_1.default.error(error);
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
        logger_1.default.error(error);
        throw error;
    }
});
let bulkArr = [];
const getChildId = (list, useYN) => {
    list.map((v, i) => {
        bulkArr.push({
            updateOne: {
                filter: { _id: v._id },
                update: { $set: { useYN: useYN } },
            },
        });
        if (v.childMenu.length > 0) {
            getChildId(v.childMenu, useYN);
        }
    });
};
const updateUnitTitleTree = (unitTitleId, unitTitleUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        getChildId([unitTitleUpdateDto.selectedList], unitTitleUpdateDto.useYN);
        yield UnitTitle_1.default.bulkWrite(bulkArr);
        const unitTitle = yield findUnitTitleById(unitTitleId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
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
const findUnitTitleById = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitTitle = yield UnitTitle_1.default.findById(unitTitleId);
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
const findUnitTitleAndDetailById = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const unitTitle = await UnitTitle.findById(unitTitleId);
        let unitTitle = yield UnitTitle_1.default.findById(unitTitleId)
            .populate("content")
            .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
            .exec();
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
const findUnitTitleTree = (unitTitleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ObjectId = mongoose_1.default.Types.ObjectId;
        const unitTitle = yield UnitTitle_1.default.aggregate([
            { $match: { _id: new ObjectId(unitTitleId) } },
            {
                $graphLookup: {
                    from: "unittitles",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent_unit_id",
                    depthField: "level",
                    as: "childMenu",
                },
            },
            {
                $unwind: {
                    path: "$childMenu",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $sort: {
                    "childMenu.level": -1,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    content: { $first: "$content" },
                    category: { $first: "$category" },
                    category_number: { $first: "$category_number" },
                    parent_unit_id: { $first: "$parent_unit_id" },
                    useYN: { $first: "$useYN" },
                    menu_level: { $first: "$menu_level" },
                    childMenu: {
                        $push: {
                            _id: "$childMenu._id",
                            title: "$childMenu.title",
                            content: "$childMenu.content",
                            category: "$childMenu.category",
                            category_number: "$childMenu.category_number",
                            parent_unit_id: "$childMenu.parent_unit_id",
                            useYN: "$childMenu.useYN",
                            menu_level: "$childMenu.menu_level",
                            level: "$childMenu.level",
                        },
                    },
                },
            },
            {
                $addFields: {
                    childMenu: {
                        $reduce: {
                            input: "$childMenu",
                            initialValue: {
                                level: -1,
                                presentChild: [],
                                prevChild: [],
                            },
                            in: {
                                $let: {
                                    vars: {
                                        prev: {
                                            $cond: [
                                                {
                                                    $eq: ["$$value.level", "$$this.level"],
                                                },
                                                "$$value.prevChild",
                                                "$$value.presentChild",
                                            ],
                                        },
                                        current: {
                                            $cond: [
                                                {
                                                    $eq: ["$$value.level", "$$this.level"],
                                                },
                                                "$$value.presentChild",
                                                [],
                                            ],
                                        },
                                    },
                                    in: {
                                        level: "$$this.level",
                                        prevChild: "$$prev",
                                        presentChild: {
                                            $concatArrays: [
                                                "$$current",
                                                [
                                                    {
                                                        _id: "$$this._id",
                                                        title: "$$this.title",
                                                        content: "$$this.content",
                                                        category: "$$this.category",
                                                        category_number: "$$this.category_number",
                                                        parent_unit_id: "$$this.parent_unit_id",
                                                        useYN: "$$this.useYN",
                                                        menu_level: "$$this.menu_level",
                                                        level: "$$this.level",
                                                        childMenu: {
                                                            $filter: {
                                                                input: "$$prev",
                                                                as: "e",
                                                                cond: {
                                                                    $eq: ["$$e.parent_unit_id", "$$this._id"],
                                                                },
                                                            },
                                                        },
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    childMenu: "$childMenu.presentChild",
                },
            },
        ]);
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
// TODO HWI 이미지는 aws s3와같은 storage에 저장하고 db에는 해당 이미지에 접근가능한경로를 저장
const findUnitTitleAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let unitTitle = yield UnitTitle_1.default.find({ menu_level: 1 })
            .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
            .exec();
        // .populate("children")
        //오브젝트용 가공 샘플
        // interface ObjType {
        //     [key: string]: any[]
        // }
        // let obj : ObjType = {};
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
                //오브젝트용 가공 샘플
                // if(obj[e.additional.category]) {
                //     obj[e.additional.category].push(e);
                // }else{
                //     obj[e.additional.category] = [];
                //     obj[e.additional.category].push(e);
                // }
            });
        }
        return list;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
//category_number 0,1을 제외한 모든 unit의 id 반환
const findUnitTitleIdList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let unitTitle = yield UnitTitle_1.default.find({
            menu_level: 1,
            category_number: { $nin: [0, 1] },
        }).exec();
        let list = {
            views: [],
            unit_total_count: 0,
        };
        unitTitle.map((e, i) => {
            list.views.push({ unit: e._id });
        });
        list.unit_total_count = list.views.length;
        return list;
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
        logger_1.default.error(error);
        throw error;
    }
});
let deleteBulkArr = [];
const getDeleteChildId = (list) => {
    list.map((v, i) => {
        deleteBulkArr.push({
            deleteOne: {
                filter: { _id: v._id },
            },
        });
        if (v.childMenu.length > 0) {
            getDeleteChildId(v.childMenu);
        }
    });
};
const deleteUnitTitleTree = (list) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        getDeleteChildId([list]);
        const unitTitle = yield UnitTitle_1.default.bulkWrite(deleteBulkArr);
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
    createUnitTitle,
    updateUnitTitle,
    updateUnitTitleTree,
    findUnitTitleById,
    findUnitTitleAndDetailById,
    findUnitTitleTree,
    findUnitTitleAll,
    findUnitTitleIdList,
    deleteUnitTitle,
    deleteUnitTitleTree,
};
//# sourceMappingURL=unitTitleService.js.map