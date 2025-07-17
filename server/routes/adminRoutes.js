import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/adminController.js';

import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly); // all routes protected & admin-only

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
