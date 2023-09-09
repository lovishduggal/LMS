import { Router } from 'express';
const router = Router();
import {
    handleRegister,
    handleLogin,
    handleLogout,
    handleProfile,
} from '../controllers/user.controller.js';

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', handleProfile);

export default router;
