import { Router } from 'express';
const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', handleProfile);

export default router;
