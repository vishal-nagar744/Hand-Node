
// Core Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';


//  Project-Specific Imports
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import logger from './utils/logger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


// App Initialization & Config
dotenv.config();
connectDB();

const app = express(); // App must be initialized before using it

app.use(cookieParser()); // Middleware to parse cookies

app.set('trust proxy', 1); // For NGINX, Cloudflare, etc.


// Middleware Setup

// Allowed Frontend Origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173' // add frontend url 
    
];

// CORS Setup
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

// Basic Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // HTTP request logger
app.use(compression()); // Gzip compression for performance
app.use(helmet()); // Secure headers

//  Custom logger using Winston
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

// Rate Limiting (Anti-DDoS)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


//  API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


// 404 and Error Handling
app.use(notFound); // Route not found
app.use(errorHandler); // Custom error handler


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
