import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { generatePresignedUrl } from '../controllers/uploadController.js';

const router = express.Router();

router.get('/presigned-url', authMiddleware, generatePresignedUrl);

export default router;