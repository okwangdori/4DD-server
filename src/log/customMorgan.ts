import logger from './logger';
import dotenv from 'dotenv';
import morgan from 'morgan';
 
dotenv.config(); // 노드 환경 변수 사용
 
const format = () => {
   const result = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
   return result;
};
 
// 로그 작성을 위한 Output stream옵션.
const stream = {
   write: (message : string) => {
      logger.info(message);
   },
};
 
// 로깅 스킵 여부 (만일 배포환경이면, 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함. 코드가 400 이상이면 로그 기록함)
const skip = (_ : any, res : any) => {
   if (process.env.NODE_ENV === 'production') {
      return res.ststusCode < 400;
   }
   return false;
};
 
//? 적용될 moran 미들웨어 형태
const morganMiddleware = morgan(format(), { stream, skip });
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

export default morganMiddleware;