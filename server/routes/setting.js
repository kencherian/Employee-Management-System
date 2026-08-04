// EMS/server/routes/setting.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { changePassword } from '../controllers/settingController.js';

const router = express.Router();

router.put('/change-password', authMiddleware, changePassword);

export default router;