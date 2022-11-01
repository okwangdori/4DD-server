import mongoose from "mongoose";
import config from "../config";
import logger from '../log/logger';

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        mongoose.set('autoCreate', true);

        logger.info(`Mongoose Connected ...
        `);
    } catch (err: any) {
        logger.error(err.message);
        process.exit(1);
    }
};

export default connectDB;