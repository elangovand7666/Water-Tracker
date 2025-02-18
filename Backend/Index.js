import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import router from './Route/UserRoute.js';
import cors from 'cors';

const app=express();
dotenv.config();
app.use(cors());

app.use(bodyparser.json())

app.use('/api',router)

const port=process.env.PORT
const url=process.env.MONGO_URL

mongoose.connect(url).then(()=>{
    console.log("Database connected")
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})

