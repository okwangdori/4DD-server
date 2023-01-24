"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSubInfoSchema = new mongoose_1.default.Schema({
    //TODO HWI 23.01.20 view_list는 가장최근 조회한 목록 최대 20~30개까지만 저장할지, 무한으로 저장할지 고려해볼것 (아직 강의가 몇개없어서 괜찮음)
    //모든 unitTitle의 Id를 저장하며, 총 unit수에서 사용자가 수강 완료 체크한 unit의 비율을 계산해서 progress_rate 산출
    views: [
        {
            progress_rate: {
                type: Number,
                required: true,
                default: 0,
            },
            unit: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: "UnitTitle",
            },
        },
    ],
    //유저가 좋아요한 목록
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "UnitTitle",
        },
    ],
    //진행률 모니터링용 카운트, 해당 유저의 카운트와 현재 unitTitle의 총 length가 다르면 views > propress_rate 다시 계산해서 업데이트 해주기 위함
    unit_total_count: {
        type: Number,
        required: true,
    },
    dateTimeOfViews: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("UserSubInfo", UserSubInfoSchema);
//# sourceMappingURL=UserSubInfo.js.map