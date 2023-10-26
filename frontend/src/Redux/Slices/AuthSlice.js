import toast from 'react-hot-toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {},
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

export const loginAccount = createAsyncThunk('/auth/login', async (data) => {
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

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        let res = axiosInstance.get('user/logout');
        toast.promise(res, {
            loading: 'Wait! logged out in progress...',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to logged out',
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
    extraReducers: (builder) => {
        builder
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem(
                    'data',
                    JSON.stringify(action?.payload?.user)
                );
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.role = '';
                state.isLoggedIn = false;
            });
    },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
