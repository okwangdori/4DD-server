import { NextFunction, Request, Response } from 'express';
import { createToken, decodeToken, getAccessToken, getRefreshToken } from '../utills/jwt.utill';
import { REFRESHTOKEN, refreshTokenCookieOptions, TOKENEXPIREDERROR } from '../constants';
import logger from '../log/logger';

const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = getAccessToken(req.headers.authorization);
  const refreshToken = getRefreshToken(req.cookies);

  logger.info("@@@@@@ cookie : "+ JSON.stringify(req.headers.cookie));
  logger.info("@@@@@@ headers : "+ JSON.stringify(req.headers.authorization));
  logger.info("@@@@@@ accessToken : "+ accessToken);
  logger.info("@@@@@@ refreshToken : "+ refreshToken);
  

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
      return res.status(200).json({ requestAgain: true, newAccessToken });
    }
    if (rError === TOKENEXPIREDERROR) {
      res.clearCookie(REFRESHTOKEN);
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

  if ((rExp as number) - now < 60 * 60 * 24 * 3.5) {
    // 3.5일
    const newRefreshToken = createToken('refresh', { id, email });
    res.cookie(REFRESHTOKEN, newRefreshToken, refreshTokenCookieOptions);
  }
  next();
};

export default jwtMiddleware;