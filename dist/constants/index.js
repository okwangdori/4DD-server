"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = exports.TOKENEXPIREDERROR = exports.REFRESHTOKEN = exports.ACCESSTOKEN = void 0;
const ACCESSTOKEN = 'accesstoken';
exports.ACCESSTOKEN = ACCESSTOKEN;
const REFRESHTOKEN = 'refreshtoken';
exports.REFRESHTOKEN = REFRESHTOKEN;
const TOKENEXPIREDERROR = 'TokenExpiredError';
exports.TOKENEXPIREDERROR = TOKENEXPIREDERROR;
const refreshTokenCookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
};
exports.refreshTokenCookieOptions = refreshTokenCookieOptions;
const accessTokenCookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 30), // 30분
};
exports.accessTokenCookieOptions = accessTokenCookieOptions;
//# sourceMappingURL=index.js.map