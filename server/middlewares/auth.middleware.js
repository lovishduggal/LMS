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

const authorizedRoles =
    (...roles) =>
    async (req, res, next) => {
        const currentUserRole = req.user.role;
        console.log(currentUserRole);
        if (!roles.includes(currentUserRole))
            return next(
                new AppError('You do not have permission to access this route')
            );

        return next();
    };
export { isLoggedIn, authorizedRoles };
