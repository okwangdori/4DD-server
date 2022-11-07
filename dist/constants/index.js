"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.TOKENEXPIREDERROR = exports.REFRESHTOKEN = void 0;
const REFRESHTOKEN = 'refreshtoken';
exports.REFRESHTOKEN = REFRESHTOKEN;
const TOKENEXPIREDERROR = 'TokenExpiredError';
exports.TOKENEXPIREDERROR = TOKENEXPIREDERROR;
const refreshTokenCookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
};
exports.refreshTokenCookieOptions = refreshTokenCookieOptions;
//# sourceMappingURL=index.js.map