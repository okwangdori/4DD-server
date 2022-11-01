"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config(); // 노드 환경 변수 사용
const format = () => {
    const result = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    return result;
};
// 로그 작성을 위한 Output stream옵션.
const stream = {
    write: (message) => {
        logger_1.default.info(message);
    },
};
// 로깅 스킵 여부 (만일 배포환경이면, 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함. 코드가 400 이상이면 로그 기록함)
const skip = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.ststusCode < 400;
    }
    return false;
};
//? 적용될 moran 미들웨어 형태
const morganMiddleware = (0, morgan_1.default)(format(), { stream, skip });
/*
morgan('dev', {
   stream = {
       write: (message) => {
          // console.log(message);
          logger.info(message);
       },
    },
   skip = (_, res) => {
      if (process.env.NODE_ENV === 'production') {
         return res.ststusCode < 400;
      }
      return false;
   };
})
*/
exports.default = morganMiddleware;
//# sourceMappingURL=customMorgan.js.map