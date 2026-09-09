import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/userRoutes";
import contentRoutes from "./Routes/contentRoutes";
import shareRoutes from "./Routes/shareRoutes";


const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");

        app.listen(process.env.PORT);
        
    }catch{
        console.log("MongoDB connection failed");
        
    }
};

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/content", contentRoutes);

app.use("/api/v1/brain/share", shareRoutes);


connectDB();