import AppError from '../utils/error.util.js';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return next(new AppError('Unauthenticated, Please login again', 401));

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return next();
};

export { isLoggedIn };
