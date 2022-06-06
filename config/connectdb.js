import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) =>{
    try
    {
        const DB_OPTIONS = {
            dbName:'node_auth_jwt'
        }

        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log('Database connected');

    }
    catch(error)
    {
      console.log(error);
    }
}

export default connectDb;