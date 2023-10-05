import AppError from '../utils/error.util.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import { razorpay } from '../server.js';
import crypto from 'crypto';
import { log } from 'console';
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

const handleVerifySubscription = async (req, res, next) => {
    const { id } = req.user;
    const {
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next('Unauthorized, Please Login ');
        }

        const subscriptionId = user.razorpay_subscription_id;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}| ${subscriptionId}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return next(
                new AppError('Payment is not verified, Please try again', 400)
            );
        }

        await Payment.create({
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
        });
        user.subscription.status = 'active';
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleCancelSubscription = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if (!user) return next(new AppError('Unauthorized Please Login', 400));

        if (user.role === 'ADMIN')
            return next(
                new AppError('Admin cannot purchase a subscription', 400)
            );

        const subscriptionId = user.subscription.id;
        const cancelSubscription = await razorpay.subscriptions.cancel(
            subscriptionId
        );
        user.subscription.status = cancelSubscription.status;
        await user.save();
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const handleAllPayments = async (req, res) => {
    //! This route and authorizeSubscribe middleware are assignments to us.
    const { count, skip } = req.query;

    const allPayemnts = await razorpay.subscriptions.all({
        count: count || 10,
        skip: skip || 0,
    });

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const finalMonths = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
    };
    
    const monthlyWisePayments = allPayemnts.items.map((payment) => {
        const monthsInNumbers = new Date(payment.start_at * 1000);
        console.log(monthsInNumbers);
        return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
        Object.keys(finalMonths).forEach((objMonth) => {
            if (month === objMonth) {
                finalMonths[month] += 1;
            }
        });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
        monthlySalesRecord.push(finalMonths[monthName]);
    });
    console.log(finalMonths);
    console.log(monthlySalesRecord);
    return res.status(200).json({
        status: true,
        allPayemnts,
        finalMonths,
        monthlySalesRecord,
    });
};

export {
    handleGetRazorpayApiKey,
    handleBuySubscription,
    handleVerifySubscription,
    handleCancelSubscription,
    handleAllPayments,
};
