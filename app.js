import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/connectdb.js';
import userRoutes  from './routes/userRoutes.js';
const app =express();
const port = process.env.PORT;
const DATABASE_URL=process.env.DATABASE_URL;

//cors policy
app.use(cors());

// database url
connectDb(DATABASE_URL);

// JSON
app.use(express.json());

// load Routes
app.use('/api/user',userRoutes);
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})