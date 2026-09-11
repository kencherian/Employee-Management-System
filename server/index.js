import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';
import connectToDatabase from './db/db.js';
import userRegister from './userSeed.js';
import cookieParser from 'cookie-parser';
import { generateCsrfToken, verifyCsrfToken } from './middleware/csrfMiddleware.js';
import uploadRouter from './routes/upload.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

connectToDatabase().then(() => {
    userRegister();
});

const app = express();

// 1. Define Rate Limiters (Must be declared before use)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { 
        success: false, 
        error: "Too many requests from this IP, please try again after 15 minutes." 
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per minute
    message: { 
        success: false, 
        error: "Too many login attempts, please try again after a minute." 
    }
});

// 2. Global Security & Parsing Middleware
app.use(helmet());
app.use(cors({
    origin: [
        "https://employee-management-system-drab-kappa.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-xsrf-token"]
}));
app.use(express.json());
app.use(cookieParser());

// 3. Apply Global API Limiter
app.use('/api', apiLimiter);

// 4. CSRF Protection
app.use(generateCsrfToken);
app.use(verifyCsrfToken);

// 5. Apply Strict Auth Limiter BEFORE the auth routes
app.use('/api/auth/login', authLimiter);

// 6. Mount API Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});