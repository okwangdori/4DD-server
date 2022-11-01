"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const process_1 = __importDefault(require("process"));
const { combine, timestamp, label, printf } = winston_1.default.format;
//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process_1.default.cwd()}/logs`;
//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston_1.default.createLogger({
    //* 로그 출력 형식 정의
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), label({ label: 'Winston Log' }), // 어플리케이션 이름
    logFormat),
    //* 실제 로그를 어떻게 기록을 한 것인가 정의
    transports: [
        //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
        new winston_daily_rotate_file_1.default({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 2,
            zippedArchive: true,
        }),
        //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
        new winston_daily_rotate_file_1.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 2,
            zippedArchive: true,
        }),
    ],
    //* uncaughtException 발생시 파일 설정
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 2,
            zippedArchive: true,
        }),
    ],
});
//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
if (process_1.default.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), // 색깔 넣어서 출력
        winston_1.default.format.simple()),
    }));
}
exports.default = logger;
//log 찍을곳에서 사용
// const logger = require("./logger");
// logger.info("hello world");
// logger.error("hello world");
// logger.warn("hello world");
// logger.debug("hello world");
// logger.verbose("hello world");
// logger.silly("hello world");
// 메시지를 여러번 써야할경우 아래 사용
// logger.info('naver profile : ', { message: profile }); // console.log와 달리 뒤에 message 객체로 써주어야 한다.
//# sourceMappingURL=logger.js.map