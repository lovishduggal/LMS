import toast from 'react-hot-toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    courseData: [],
};

export const getAllCourses = createAsyncThunk('/course/get', async () => {
    try {
        const response = axiosInstance.get('/courses');
        toast.promise(response, {
            loading: 'Loading course data...',
            success: 'Courses loaded sucessfully',
            error: 'Failed to load courses',
        });
        return (await response).data.courses;
    } catch (err) {
        toast.error(err.message);
    }
});

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload];
            }
        });
    },
});
export default courseSlice.reducer;
