import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [5, 'Name must be at least 5 characters'],
            maxLength: [50, 'Name must be less than 50 characters'],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please fill a valid email address',
            ],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters'],
            select: true,
        },
        avator: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    { timestamps: true }
);

const user = model('user', userSchema);
console.log(user);

export default user;
