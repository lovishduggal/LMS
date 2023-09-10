import AppError from '../utils/error.util';
const handleRegister = (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
        //! Tomorrow, I will begin from this point.
    }
};

const handleLogin = (req, res) => {};
const handleLogout = (req, res) => {};
const handleProfile = (req, res) => {};

export { handleRegister, handleLogin, handleLogout, handleProfile };
