import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import financialRecordRouter from '../routes/financial-records.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors())

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(()=> console.log("Connected to mongodb")).catch((err)=>console.error("Failed to connect to mongodb: ", err));

app.use('/api/financial-records', financialRecordRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
