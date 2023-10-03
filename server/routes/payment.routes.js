import { Router } from 'express';
import {
    handleAllPayments,
    handleBuySubscription,
    handleCancelSubscription,
    handleGetRazorpayApiKey,
    handleVerifySubscription,
} from '../controllers/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/razorpay-key').get(isLoggedIn, handleGetRazorpayApiKey);
router.route('/subscribe').post(isLoggedIn, handleBuySubscription);
router.route('/verify').post(isLoggedIn, handleVerifySubscription);
router.route('/unsubscribe').post(isLoggedIn, handleCancelSubscription);
router.route('/').get(isLoggedIn, authorizedRoles('ADMIN'), handleAllPayments);

export default router;
