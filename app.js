import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/connectdb.js';
import userRoutes  from './routes/userRoutes.js';
import productRoutes  from './routes/productRoutes.js';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// load Routes
app.use('/api/user',userRoutes);
app.use('/api/user',productRoutes);

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})