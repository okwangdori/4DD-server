"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.decodeToken = exports.createToken = void 0;
const logger_1 = __importDefault(require("../log/logger"));
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getExp = (tokenType) => {
    const ACCESS_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 30; // 30분 : 60 * 30;   // 3초 : 3
    const REFRESH_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7일 : 60 * 60 * 24 * 7;  // 5초 : 5
    return tokenType === 'access' ? ACCESS_TOKEN_EXPIRE_DATE : REFRESH_TOKEN_EXPIRE_DATE;
};
const getSecret = (tokenType) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access';
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh';
    return tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
};
const createToken = (tokenType, option) => {
    const exp = getExp(tokenType);
    const secret = getSecret(tokenType);
    const token = jsonwebtoken_1.default.sign(Object.assign({ exp }, option), secret);
    return token;
};
exports.createToken = createToken;
const decodeToken = (tokenType, token) => {
    return new Promise(resolve => {
        const secret = getSecret(tokenType);
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name !== constants_1.TOKENEXPIREDERROR) {
                    logger_1.default.info(err);
                }
                resolve({ jwtError: err.name });
            }
            if (typeof decoded !== 'object') {
                const jwtError = 'token is not a object';
                logger_1.default.info(jwtError);
                resolve({ jwtError });
            }
            resolve(decoded);
        });
    });
};
exports.decodeToken = decodeToken;
// const getAccessToken = (authorization: string | undefined): string | undefined => {
//   return authorization?.split('Bearer ')[1];
// };
// const getRefreshToken = (cookies: { refreshtoken: string | undefined }): string | undefined => {
//   return cookies?.refreshtoken;
// };
const getToken = (cookies, tokenType) => {
    let token = '';
    cookies === null || cookies === void 0 ? void 0 : cookies.split(';').map((item) => {
        const cookieItem = item.trim();
        if (tokenType === 'accesstoken' && item.match('accesstoken')) {
            token = cookieItem.split('=')[1];
        }
        if (tokenType === 'refreshtoken' && item.match('refreshtoken')) {
            token = cookieItem.split('=')[1];
        }
    });
    return token;
};
exports.getToken = getToken;
//# sourceMappingURL=jwt.utill.js.map