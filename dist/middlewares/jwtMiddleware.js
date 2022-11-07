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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utill_1 = require("../utills/jwt.utill");
const constants_1 = require("../constants");
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, jwt_utill_1.getAccessToken)(req.headers.authorization);
    const refreshToken = (0, jwt_utill_1.getRefreshToken)(req.cookies);
    if (!accessToken || !refreshToken) {
        return next();
    }
    const { id: aId, email: aEmail, jwtError: aError } = yield (0, jwt_utill_1.decodeToken)('access', accessToken);
    const { exp: rExp, id: rId, email: rEmail, jwtError: rError, } = yield (0, jwt_utill_1.decodeToken)('refresh', refreshToken);
    if (aError || rError) {
        if (aError === constants_1.TOKENEXPIREDERROR && !rError) {
            const newAccessToken = (0, jwt_utill_1.createToken)('access', { id: rId, email: rEmail });
            return res.status(200).json({ requestAgain: true, newAccessToken });
        }
        if (rError === constants_1.TOKENEXPIREDERROR) {
            res.clearCookie(constants_1.REFRESHTOKEN);
            return res.status(200).json({ expiredRefreshToken: true });
        }
        return next();
    }
    if (aId !== rId || aEmail !== rEmail) {
        return next();
    }
    const [id, email] = [aId, aEmail];
    req.user = { id, email };
    const now = Math.floor(Date.now() / 1000);
    if (rExp - now < 60 * 60 * 24 * 3.5) {
        // 3.5일
        const newRefreshToken = (0, jwt_utill_1.createToken)('refresh', { id, email });
        res.cookie(constants_1.REFRESHTOKEN, newRefreshToken, constants_1.refreshTokenCookieOptions);
    }
    next();
});
exports.default = jwtMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map