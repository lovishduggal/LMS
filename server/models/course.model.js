import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Title is required'],
        minLength: [8, 'Title must be at least 8 characters'],
        maxLength: [60, 'Title should be less than  60 characters'],
        trim: true,
    },
    description: {
        type: String,
        require: [true, 'Description is required'],
        minLength: [8, 'Description must be at least 8 characters'],
        maxLength: [200, 'Description should be less than  200 characters'],
    },
    category: {
        type: String,
        require: [true, 'Category is required'],
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String,
                    required: true,
                },
                secure_url: {
                    type: String,
                    required: true,
                },
            },
        },
    ],
    numbersOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true,
    },
});

const Course = model('course', courseSchema);
export default Course;
