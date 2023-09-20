import { Router } from 'express';
const router = Router();
import {
    handleRegister,
    handleLogin,
    handleLogout,
    handleProfile,
    handleForgot,
    handleReset,
} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

router.post('/register', upload.single('avatar'), handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', isLoggedIn, handleProfile);
router.post('/forgot', handleForgot);
router.get('/reset/:resetToken', handleReset);

export default router;
