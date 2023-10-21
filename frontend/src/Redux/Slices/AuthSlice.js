import toast from 'react-hot-toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
};
export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
        let res = axiosInstance.post('user/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.promise(res, {
            loading: 'Wait! Creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create account',
        });
        res = await res;
        return res.data;
    } catch (err) {
        toast.error(err.message);
    }
});

export const loginAccount = createAsyncThunk('/auth/ogin', async (data) => {
    try {
        let res = axiosInstance.post('user/login', data);
        toast.promise(res, {
            loading: 'Wait! authentication in progress...',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to login',
        });
        res = await res;
        return res.data;
    } catch (err) {
        toast.error(err.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
