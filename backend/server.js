import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import  connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import wasteRoutes from './routes/wasteRoutes.js';                                                                                                
import profileRoutes from "./routes/profile.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "https://waste-management-frontend1.onrender.com/login", // 👈 EXACT frontend URL
  credentials: true                // 👈 REQUIRED for cookies
}));
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/waste', wasteRoutes);
app.use("/api/auth/profile", profileRoutes);
app.listen(process.env.PORT,()=>console.log('Server running on port '+process.env.PORT));