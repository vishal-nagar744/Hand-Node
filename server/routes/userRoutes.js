import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  uploadUserAvatar,
} from '../controllers/userController.js';
import upload from '../middleware/multer.js';

import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changeUserPassword);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadUserAvatar);

export default router;
