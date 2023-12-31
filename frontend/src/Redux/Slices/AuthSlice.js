import toast from 'react-hot-toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data:
        !localStorage.getItem('data') == 'undefind'
            ? localStorage.getItem('data')
            : JSON.parse(localStorage.getItem('data')),
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

export const updateProfile = createAsyncThunk(
    '/user/update/profile',
    async (data) => {
        try {
            let res = axiosInstance.put('user/update', data);
            toast.promise(res, {
                loading: 'Updating...',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to update profile',
            });
            res = await res;
            return res.data;
        } catch (err) {
            toast.error(err.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    '/user/change/password',
    async (data) => {
        try {
            let res = axiosInstance.post('user/change', data);
            toast.promise(res, {
                loading: 'Changing...',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to change password',
            });
            res = await res;
            return res.data;
        } catch (err) {
            toast.error(err?.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    '/auth/forget/password',
    async (data) => {
        try {
            let res = axiosInstance.post('user/forgot', data);
            toast.promise(res, {
                loading: 'Wait! reset password link is generating...',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to generate link',
            });
            res = await res;
            return res.data;
        } catch (err) {
            toast.error(err?.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    '/auth/reset/password',
    async (data) => {
        console.log(data);
        try {
            let res = axiosInstance.post(`user/reset/${data.id}`, data);
            toast.promise(res, {
                loading: 'Wait! resetting the password...',
                success: (data) => {
                    return data?.data?.message;
                },
                error: 'Failed to reset the password',
            });
            res = await res;
            return res.data;
        } catch (err) {
            toast.error(err?.message);
        }
    }
);

export const getUserData = createAsyncThunk('/user/details', async () => {
    try {
        const res = await axiosInstance.get('/user/me');
        return res?.data;
    } catch (error) {
        toast.error(error.message);
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
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem(
                    'data',
                    JSON.stringify(action?.payload?.user)
                );
                localStorage.setItem('isLoggedIn', true);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            });
    },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
