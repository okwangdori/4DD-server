import { NextFunction, Request, Response } from 'express';
import { createToken, decodeToken, getToken } from '../utills/jwt.utill';
import { ACCESSTOKEN, REFRESHTOKEN, accessTokenCookieOptions, refreshTokenCookieOptions, TOKENEXPIREDERROR } from '../constants';
import logger from '../log/logger';
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";

const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = getToken(req.headers.cookie, 'accesstoken');
  const refreshToken = getToken(req.headers.cookie, 'refreshtoken');

  if (!accessToken || !refreshToken) {
    return next();
  }

  const { id: aId, email: aEmail, jwtError: aError } = await decodeToken('access', accessToken as string);
  const {
    exp: rExp,
    id: rId,
    email: rEmail,
    jwtError: rError,
  } = await decodeToken('refresh', refreshToken as string);

  if (aError || rError) {
    if (aError === TOKENEXPIREDERROR && !rError) {
      const newAccessToken = createToken('access', { id: rId, email: rEmail });
      res.cookie(ACCESSTOKEN, newAccessToken, accessTokenCookieOptions);
    }
    if (rError === TOKENEXPIREDERROR) {
      // res.clearCookie(REFRESHTOKEN);
      res.cookie(REFRESHTOKEN, '');
      // return res.status(200).json({ expiredRefreshToken: true });
      return res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.EXPIRED_REFRESH_TOKEN));
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
};

export default jwtMiddleware;