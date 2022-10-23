import dotenv from 'dotenv'

const applyDotenv = () => {
  dotenv.config()

  return {
    mongoUri: process.env.MONGO_URI as string,
    port: process.env.PORT as string,
    jwtSecret: process.env.JWT_SECERT as string,
    origin: process.env.ORIGIN as string,
  }
}
export default applyDotenv
