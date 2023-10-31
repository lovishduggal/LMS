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

export const createNewCourse = createAsyncThunk(
    '/course/create',
    async (data) => {
        try {
            const response = axiosInstance.post('/courses', data);
            toast.promise(response, {
                loading: 'Creating new course',
                success: 'Course created successfully',
                error: 'Failed to create course',
            });

            return (await response).data;
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: 'deleting course ...',
            success: 'Courses deleted successfully',
            error: 'Failed to delete the courses',
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
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
