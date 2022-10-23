// import dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan'
// // import index from "./src/routes/index";
import db from './src/models/index'
import applyDotenv from './src/lambdas/applyDotenv'

const indexRouter = express.Router()

indexRouter.route('/').get((_req, res) => {
  res.json({ '현재 시간 : ': new Date().toLocaleString() })
})

async function startServer() {
  const app = express()
  const { mongoUri, port, jwtSecret } = applyDotenv()
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/', indexRouter)
  app.use(morgan('dev'))

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
