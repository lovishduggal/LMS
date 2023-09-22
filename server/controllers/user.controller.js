import AppError from '../utils/error.util.js';
import User from '../models/user.model.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import sendMail from '../utils/sendEmail.js';
import crypto from 'crypto';
import { log } from 'console';
const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
};

const handleRegister = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return next(new AppError('All fields are required', 400));

        const userExits = await User.findOne({ email });
        if (userExits) return next(new AppError('Email already exits', 400));

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'dummy url',
            },
        });
        if (!user)
            return next(
                new AppError('User registration failed, Please try again', 400)
            );

        //! File upload:
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(
                    req.file.path,
                    {
                        folder: 'LMS',
                        width: 250,
                        height: 250,
                        gravity: 'faces',
                        crop: 'fill',
                    }
                );
                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filename}`, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            } catch (error) {
                return next(new AppError(error, 500));
            }
        }

        await user.save();

        user.password = undefined;

        const token = user.generateJWTToken();

        res.cookie('token', token, cookieOptions);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password)
            return next(new AppError('All fields are required', 400));
        console.log(email, password);

        const user = await User.findOne({ email }).select('+password');
        const isPasswordMatched = await user.comparePassword(password);
        if (user && isPasswordMatched) {
            user.password = undefined;
            const token = user.generateJWTToken();
            res.cookie('token', token, cookieOptions);
            return res.status(200).json({
                success: true,
                message: 'User loggedIn successfully',
                user,
            });
        } else {
            return next(new AppError('Email and password do not match', 400));
        }
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleLogout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true,
    });

    return res.status(200).json({
        success: true,
        message: 'User loggedOut successfully',
    });
};

const handleProfile = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const user = await User.findById({ _id: UserId });
        user.password = undefined;
        return res.status(200).json({
            success: true,
            message: 'User details',
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleForgot = async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new AppError('Email  is required', 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError('Email is nor registered', 400));

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
    const subject = 'Reset Password';
    const message = `You can reset password by clicking <a href="${resetPasswordURL}" target="_blank">Here</a>`;
    try {
        sendMail(email, subject, message);
        return res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`,
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        return next(new AppError(error.message, 500));
    }
};

const handleReset = async (req, res, next) => {
    const { resetToken } = req.params;

    const { password } = req.body;
    if (!password) return next(new AppError('Password field required', 400));

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });
    console.log('user', user);

    if (!user)
        return next(
            new AppError('Token is invalid or expired, Please try again', 400)
        );

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password is reset successfully',
    });
};

async function handleChangePassword(req, res, next) {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword)
        return next(new AppError('All fields are required', 400));

    const user = await User.findById(id).select('+password');
    if (!user) return next(new AppError('User does not exit', 400));

    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched)
        return next(new AppError('Invalid old password', 400));

    user.password = newPassword;
    await user.save();
    user.password = undefined;

    return res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
}

async function handleUpdateProfile(req, res, next) {
    const { fullName } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) return next(new AppError('User does not exit', 400));

    if (req.body.fullName) user.fullName = fullName;

    if (req.file) {
        try {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LMS',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        } catch (error) {
            return next(new AppError(error, 500));
        }
    }

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'User details updated successfully',
    });

    return;
}

export {
    handleRegister,
    handleLogin,
    handleLogout,
    handleProfile,
    handleForgot,
    handleReset,
    handleChangePassword,
    handleUpdateProfile,
};
