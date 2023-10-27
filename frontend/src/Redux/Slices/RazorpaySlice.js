import toast from 'react-hot-toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    key: '',
    subscription_id: '',
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const purchaseCourseBundle = createAsyncThunk(
    '/purchaseCourse',
    async () => {
        try {
            const response = await axiosInstance.post('/payments/subscribe');
            return response.data;
        } catch (error) {
            toast.error(error.message);
        }
    }
);

export const verifyUserPayment = createAsyncThunk(
    '/payments/verify',
    async (data) => {
        try {
            const response = await axiosInstance.post('/payments/verify', {
                ...data,
            });
            return response.data;
        } catch (error) {
            toast.error(error.message);
        }
    }
);

export const getPaymentRecord = createAsyncThunk(
    '/payments/record',
    async () => {
        try {
            const response = axiosInstance.get('/payments?count=100');
            toast.promise(response, {
                loading: 'Getting the payment records',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to get payment records',
            });
            return (await response).data;
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

export const cancelCourseBundle = createAsyncThunk(
    '/payments/cancel',
    async () => {
        try {
            const response = axiosInstance.post('/payments/unsubscribe');
            toast.promise(response, {
                loading: 'unsubscribing the bundle',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to unsubscribe',
            });
            return (await response).data;
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            });
    },
});
