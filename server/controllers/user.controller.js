import AppError from '../utils/error.util';
import User from '../models/user.model.js';
const handleRegister = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
        //! Tomorrow, I will begin from this point.
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
        return next(new AppError('Email already exits', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'dummy url',
        },
    });
    if (!user) {
        return next(
            new AppError('User registration failed, Please try again', 400)
        );
    }

    // TODO: File upload:

    await user.save();
};

const handleLogin = (req, res) => {};
const handleLogout = (req, res) => {};
const handleProfile = (req, res) => {};

export { handleRegister, handleLogin, handleLogout, handleProfile };
