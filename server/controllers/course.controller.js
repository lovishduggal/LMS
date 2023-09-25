import Course from '../models/course.model.js';
import AppError from '../utils/error.util.js';

const handleGetAllCourses = async function (req, res, next) {
    try {
        const courses = await Course.find({}).select('-lectures');
        if (!courses.length)
            return next(new AppError('Courses not found', 400));
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
    return res.status(200).json({
        success: true,
        message: 'All courses',
        courses,
    });
};
const handleGetLecturesByCourseId = async function (req, res, next) {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!id) return next(new AppError('Invalid course id', 400));
        return res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export { handleGetAllCourses, handleGetLecturesByCourseId };
