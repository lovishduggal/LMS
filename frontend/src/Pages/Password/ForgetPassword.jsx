import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isValidEmail } from '../../Helpers/regexMatcher';
import HomeLayout from '../../Layouts/HomeLayout';
import { forgotPassword } from '../../Redux/Slices/AuthSlice';

function ForgetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    function userInput(e) {
        const { value } = e.target;
        setEmail(value);
        console.log(email);
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!email) {
            toast.error('Email field is required');
            return;
        }
        if (!isValidEmail(email)) {
            toast.error('Invalid email id');
            return;
        }
        const res = await dispatch(forgotPassword({ email }));
        if (res?.payload?.success) navigate(-1);
        setEmail('');
    }
    return (
        <HomeLayout>
            <div className="h-screen flex items-center justify-center">
                <form
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-2xl w-[300px] border">
                    <h1 className="text-center text-2xl font-bold">
                        Reset Password
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
                            placeholder="Enter your email...."
                            className="bg-transparent px-2 py-1 border"
                            onChange={userInput}
                            value={email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        Reset Password
                    </button>
                    <p>
                        <Link
                            to="/login"
                            className="link text-accent cursor-pointer text-center flex items-center justify-center gap-2">
                            {' '}
                            <BsArrowLeft /> <span>Go back to login</span>
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ForgetPassword;
