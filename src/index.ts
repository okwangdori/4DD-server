require('dotenv').config();
import express, { Request, Response, NextFunction } from "express";
import config from "./config";
const app = express();
import connectDB from "./loaders/db";
import routes from './router';
const cors = require("cors");
import logger from './log/logger';
import morgan from './log/customMorgan';

connectDB(); // DB 연결하기

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//   app.use(morgan('dev'))
app.use(cors());
app.use(morgan);
app.use(routes);   //라우터 분리

// error handler
interface ErrorType {
  message: string;
  status: number;
};

// 모든 에러에 대한 핸들링
app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {  
  res.locals.message = err.message;  
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  logger.error(res);
});

app
  .listen(config.port, () => {
    logger.info(`
    ################ Server listening on port ${config.port} ################
    `);
  })
  .on("error", (err) => {
    logger.error(err);
    console.error(err);
    process.exit(1);
  });