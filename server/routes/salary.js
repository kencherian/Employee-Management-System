// EMS/server/routes/salary.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary, getSalary } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/:id', authMiddleware, getSalary);

export default router;