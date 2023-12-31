import { Router } from 'express';
const router = Router();
import {
    handleRegister,
    handleLogin,
    handleLogout,
    handleProfile,
    handleForgot,
    handleReset,
    handleChangePassword,
    handleUpdateProfile,
    handleContactUs,
    handleUserStats,
} from '../controllers/user.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

router.post('/register', upload.single('avatar'), handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', isLoggedIn, handleProfile);
router.post('/forgot', handleForgot);
router.post('/reset/:resetToken', handleReset);
router.post('/change', isLoggedIn, handleChangePassword);
router.put('/update', isLoggedIn, upload.single('avatar'), handleUpdateProfile);
router.post('/contact', handleContactUs);
router
    .route('/admin/stats/users')
    .get(isLoggedIn, authorizedRoles('ADMIN'), handleUserStats);

export default router;
