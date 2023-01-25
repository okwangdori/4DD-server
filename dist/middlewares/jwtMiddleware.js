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
const jwt_utill_1 = require("../utills/jwt.utill");
const constants_1 = require("../constants");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, jwt_utill_1.getToken)(req.headers.cookie, 'accesstoken');
    const refreshToken = (0, jwt_utill_1.getToken)(req.headers.cookie, 'refreshtoken');
    if (!accessToken || !refreshToken) {
        return next();
    }
    const { id: aId, email: aEmail, jwtError: aError } = yield (0, jwt_utill_1.decodeToken)('access', accessToken);
    const { exp: rExp, id: rId, email: rEmail, jwtError: rError, } = yield (0, jwt_utill_1.decodeToken)('refresh', refreshToken);
    if (aError || rError) {
        if (aError === constants_1.TOKENEXPIREDERROR && !rError) {
            const newAccessToken = (0, jwt_utill_1.createToken)('access', { id: rId, email: rEmail });
            res.cookie(constants_1.ACCESSTOKEN, newAccessToken, constants_1.accessTokenCookieOptions);
        }
        if (rError === constants_1.TOKENEXPIREDERROR) {
            // res.clearCookie(REFRESHTOKEN);
            res.cookie(constants_1.REFRESHTOKEN, '');
            // return res.status(200).json({ expiredRefreshToken: true });
            return res.status(statusCode_1.default.FORBIDDEN).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.EXPIRED_REFRESH_TOKEN));
        }
        return next();
    }
    if (aId !== rId || aEmail !== rEmail) {
        return next();
    }
    const [id, email] = [aId, aEmail];
    req.user = { id, email };
    // const now = Math.floor(Date.now() / 1000);
    // if ((rExp as number) - now < 60 * 60 * 24 * 3.5) {
    //   // 3.5일
    //   const newRefreshToken = createToken('refresh', { id, email });
    //   res.cookie(REFRESHTOKEN, newRefreshToken, refreshTokenCookieOptions);
    // }
    next();
});
exports.default = jwtMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map