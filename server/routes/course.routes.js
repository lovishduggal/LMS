import { Router } from 'express';
const router = Router();
import {
    handleGetAllCourses,
    handleGetLecturesByCourseId,
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteCourse,
} from '../controllers/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

router
    .route('/')
    .get(handleGetAllCourses)
    .post(upload.single('thumbnail'), handleCreateCourse);

router
    .route('/:id')
    .get(isLoggedIn, handleGetLecturesByCourseId)
    .put(handleUpdateCourse)
    .delete(handleDeleteCourse);

export default router;
