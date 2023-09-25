import { Router } from 'express';
const router = Router();
import {
    handleGetAllCourses,
    handleGetLecturesByCourseId,
} from '../controllers/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

router.get('/', handleGetAllCourses);
router.get('/:id', isLoggedIn, handleGetLecturesByCourseId);

export default router;
