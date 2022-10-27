import mongoose from 'mongoose';
import role from './role';
import user from './user';

const mongoUri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;



let db = {
    mongoose : mongoose,
    user : user,
    role : role,
    ROLES : ["user", "admin", "moderator"],
    url : mongoUri
};

export default db;