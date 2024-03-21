import express  from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dataRoute from "./routes/data.js"

const app=express();
dotenv.config();
port=process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}))
app.use("/api",dataRoute)

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    }
}

app.listen(port,()=>{
    connectMongoDB();
    console.log("connected to backend...");
})