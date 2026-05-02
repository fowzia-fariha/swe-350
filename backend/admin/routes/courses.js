import express from 'express';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

router.get('/', getAllCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;