import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getDashboardStats } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

router.get('/stats', getDashboardStats);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;