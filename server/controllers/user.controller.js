import AppError from '../utils/error.util.js';
import User from '../models/user.model.js';
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

        // TODO: File upload:

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

        if (!email || !password)
            return next(new AppError('All fields are required', 400));

        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.comparePassword(password))
            return next(new AppError('Email and password do not match', 400));

        user.password = undefined;

        const token = user.generateJWTToken();
        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'User loggedIn successfully',
            user,
        });
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

export { handleRegister, handleLogin, handleLogout, handleProfile };
