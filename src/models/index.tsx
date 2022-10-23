import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

let db = {
    mongoose : mongoose,
    url : mongoUri
};

export default db;