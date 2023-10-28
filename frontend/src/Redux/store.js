import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice';
import CourseSliceReducer from './Slices/CourseSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: CourseSliceReducer,
        razorpay: razorpaySliceReducer,
    },
    devTools: true,
});
export default store;
