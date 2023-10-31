import { Router } from 'express';
const router = Router();
import {
    handleGetAllCourses,
    handleGetLecturesByCourseId,
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleLectureToCourseById,
    handleRemoveLectureFromCourse,
} from '../controllers/course.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

router
    .route('/')
    .get(handleGetAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        handleCreateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        handleRemoveLectureFromCourse
    );

router
    .route('/:id')
    .get(isLoggedIn, handleGetLecturesByCourseId)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        handleLectureToCourseById
    )
    .put(isLoggedIn, authorizedRoles('ADMIN'), handleUpdateCourse)
    .delete(isLoggedIn, authorizedRoles('ADMIN'), handleDeleteCourse);

export default router;
