// import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'
// // import index from "./src/routes/index";
import db from './src/models'
import applyDotenv from './src/lambdas/applyDotenv'
const cors = require("cors");

const Role = db.role;

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
      initial();
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

function initial() {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
