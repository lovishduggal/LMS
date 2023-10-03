import AppError from '../utils/error.util.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import { razorpay } from '../server.js';

const handleGetRazorpayApiKey = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Razor API Key',
        key: process.env.RAZORPAY_PLAN_ID,
    });
};

const handleBuySubscription = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if (!user) return next(new AppError('Unauthorized Please Login', 400));

        if (user.role === 'ADMIN')
            return next(
                new AppError('Admin cannot purchase a subscription', 400)
            );

        const options = {
            plan_id: process.env.RAZORPAY_PLAN_ID,
            total_count: 1,
            customer_notify: 1,
        };
        const subscription = await razorpay.subscriptions.create(options);

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Subscribed successfully',
            subscription_id: subscription.id,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleVerifySubscription = (req, res, next) => {};

const handleCancelSubscription = (req, res) => {};

const handleAllPayments = (req, res) => {};

export {
    handleGetRazorpayApiKey,
    handleBuySubscription,
    handleVerifySubscription,
    handleCancelSubscription,
    handleAllPayments,
};
