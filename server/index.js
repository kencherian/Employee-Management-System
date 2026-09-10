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
import cookieParser from 'cookie-parser';
import { generateCsrfToken, verifyCsrfToken } from './middleware/csrfMiddleware.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

connectToDatabase().then(() => {
    userRegister();
});

const app = express();

// Configure CORS to explicitly allow your Vercel origin
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

// Apply CSRF Protection Globally
app.use(generateCsrfToken);
app.use(verifyCsrfToken);

// API Routes
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