"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./loaders/db"));
const router_1 = __importDefault(require("./router"));
const cors = require("cors");
const logger_1 = __importDefault(require("./log/logger"));
const customMorgan_1 = __importDefault(require("./log/customMorgan"));
(0, db_1.default)(); // DB 연결하기
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//   app.use(morgan('dev'))
app.use(cors());
app.use(customMorgan_1.default);
app.use(router_1.default); //라우터 분리
// 모든 에러에 대한 핸들링
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
    logger_1.default.error(res);
});
app
    .listen(config_1.default.port, () => {
    logger_1.default.info(`
    ################ Server listening on port ${config_1.default.port} ################
    `);
})
    .on("error", (err) => {
    logger_1.default.error(err);
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map