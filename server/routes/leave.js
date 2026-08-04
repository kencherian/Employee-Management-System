// EMS/server/routes/leave.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    addLeave, 
    getLeave, 
    getLeaves, 
    getLeaveDetail, 
    updateLeave 
} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware, addLeave);
router.get('/detail/:id', authMiddleware, getLeaveDetail);
router.get('/:id', authMiddleware, getLeave);
router.get('/', authMiddleware, getLeaves);
router.put('/:id', authMiddleware, updateLeave);

export default router;