import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout';
import { loginAccount } from '../Redux/Slices/AuthSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setloginData] = useState({
        email: '',
        password: '',
    });
    function handleUserInput(e) {
        const { name, value } = e.target;
        setloginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('Please fill all the details');
            return;
        }

        if (!loginData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            toast.error('Invalid email address');
            return;
        }
        // if (
        //     !loginData.password.match(
        //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        //     )
        // ) {
        //     toast.error(
        //         'Password  must be  8 or greater than 8 characters long. Password must contains a number,  lower case alphabet, upper case alphabet, and special character'
        //     );
        //     return;
        // }
        const formData = { ...loginData };
        const res = await dispatch(loginAccount(formData));
        if (res?.payload?.success) navigate('/');

        setloginData({
            email: '',
            password: '',
        });
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={onLogin}
                    noValidate
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-2xl w-[300px] border ">
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        Login
                    </button>
                    <p className="text-center">
                        Already have an account?{' '}
                        <Link
                            to="/signup"
                            className="link text-accent cursor-pointer">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Login;
