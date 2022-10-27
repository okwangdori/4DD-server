// import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'
// // import index from "./src/routes/index";
import db from './src/models/index'
import applyDotenv from './src/lambdas/applyDotenv'
const cors = require("cors");

async function startServer() {
  const app = express()
  const { mongoUri, port, jwtSecret } = applyDotenv()
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(cors())
  app.use('/api', require('./src/api'));	// /api 엔드포인트에 요청이 들어오면 api 폴더로 분기한다.

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Hi! This is my first express server. My name is Woojin.');
  });
 
  db.mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('-----MONGODB CONNECT SUCCESS!!!-----')
    })
    .catch((err) => {
      console.log('-----MONGODB CONNECT FAIL...--------', err)
      process.exit()
    })

  app.listen(port, () => {
    console.log('-----SERVER START SUCCESS!!!--------')
  })
}
startServer()
