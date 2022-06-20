import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/connectdb.js';
import userRoutes  from './routes/userRoutes.js';
import productRoutes  from './routes/productRoutes.js';
import multer from 'multer';
const app =express();
const port = process.env.PORT;
const DATABASE_URL=process.env.DATABASE_URL;

//cors policy
app.use(cors());

// database url
connectDb(DATABASE_URL);

//for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// set the static folder
app.use(express.static('public'));

// load Routes
app.use('/api/user',userRoutes);
app.use('/api/user',productRoutes);

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})