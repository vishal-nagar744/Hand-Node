import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword,  logoutUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { registerValidator } from '../validators/authValidators.js';


const router = express.Router();

router.post('/register', registerValidator, validate, registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', protect, logoutUser);

export default router;