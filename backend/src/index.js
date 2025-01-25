import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();
const app=express();
const port=process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173", 
    Credentials: true,
}));
app.use("/api/auth",authRoutes)
app.use("api/message",messageRoutes)
app.listen(port,()=>{
    console.log("the server is running at"+port)
    connectDB();
});