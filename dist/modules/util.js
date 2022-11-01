"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../log/logger"));
// modules/util.ts -> success, fail 메세지 가공
const util = {
    success: (status, message, data) => {
        logger_1.default.info('success : ', {
            status,
            success: true,
            message,
            data,
        });
        return {
            status,
            success: true,
            message,
            data,
        };
    },
    fail: (status, message, data) => {
        logger_1.default.error('fail : ', {
            status,
            success: false,
            message,
        });
        return {
            status,
            success: false,
            message,
        };
    },
};
exports.default = util;
//# sourceMappingURL=util.js.map