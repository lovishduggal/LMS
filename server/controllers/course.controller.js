import { log } from 'console';
import Course from '../models/course.model.js';
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

const handleGetAllCourses = async function (req, res, next) {
    try {
        const courses = await Course.find({}).select('-lectures');
        if (!courses.length)
            return next(new AppError('Courses not found', 400));
        return res.status(200).json({
            success: true,
            message: 'All courses',
            courses,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
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

const handleCreateCourse = async function (req, res, next) {
    const { title, description, category, createdBy } = req.body;
    console.log(title, description, category, createdBy);
    if (!title || !description || !category || !createdBy)
        return next(new AppError('All fields are required', 400));

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: 'dummy id',
            secure_url: 'dummy url',
        },
    });
    if (!course)
        return next(
            new AppError('Course could not created, Please try again', 500)
        );

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LMS',
            });
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
                fs.rm(`uploads/${req.file.filename}`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        } catch (error) {
            new AppError(error.message, 500);
        }
    }

    await course.save();

    return res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course,
    });
};

const handleUpdateCourse = async function (req, res, next) {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                runValidators: true,
            }
        );
        if (!course) new AppError('Course with given id does not exist', 400);

        return res.status(200).json({
            success: true,
            message: 'Course with given id updated successfully',
            course,
        });
    } catch (error) {
        new AppError(error.message, 500);
    }
};

const handleDeleteCourse = async function (req, res, next) {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) new AppError('Course with given id does not exist', 400);

        return res.status(200).json({
            success: true,
            message: 'Course with given id deleted successfully',
            course,
        });
    } catch (error) {
        new AppError(error.message, 500);
    }
};

const handleLectureToCourseById = async function (req, res, next) {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!title || !description)
        return next(new AppError('All fields are required', 400));

    try {
        const course = await Course.findById(id);
        if (!course)
            return next(
                new AppError('Course does not exist, Please try again', 500)
            );

        const lectureData = {
            title,
            description,
            lecture: {
                public_id: 'dummy',
                secure_url: 'dummy',
            },
        };

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(
                    req.file.path,
                    {
                        folder: 'LMS',
                        resource_type: 'video',
                    }
                );
                if (result) {
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                    fs.rm(`uploads/${req.file.filename}`, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            } catch (error) {
                new AppError(error.message, 500);
            }
        }

        course.lectures.push(lectureData);
        course.numbersOfLectures = course.lectures.length;
        await course.save();

        return res.status(200).json({
            success: true,
            message: 'Lecture added in Course with given id successfully',
            course,
        });
    } catch (error) {
        return next(
            new AppError('Course does not exist, Please try again', 500)
        );
    }
};

const handleRemoveLectureFromCourse = async (req, res, next) => {
    const { courseId, lectureId } = req.query;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    if (!lectureId) {
        return next(new AppError('Lecture ID is required', 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('Invalid ID or Course does not exist.', 404));
    }

    const lectureIndex = course.lectures.findIndex(
        (lecture) => lecture._id.toString() === lectureId.toString()
    );

    if (lectureIndex === -1) {
        return next(new AppError('Lecture does not exist.', 404));
    }

    await cloudinary.v2.uploader.destroy(
        course.lectures[lectureIndex].lecture.public_id,
        {
            resource_type: 'video',
        }
    );

    course.lectures.splice(lectureIndex, 1);

    course.numbersOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course lecture removed successfully',
    });
};

export {
    handleGetAllCourses,
    handleGetLecturesByCourseId,
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleLectureToCourseById,
    handleRemoveLectureFromCourse,
};
