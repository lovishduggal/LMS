import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { isValidPassword } from '../../Helpers/regexMatcher';
import HomeLayout from '../../Layouts/HomeLayout';
import { resetPassword } from '../../Redux/Slices/AuthSlice';

function ResetPassword() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: '',
        id: useParams(),
    });

    function userInput(e) {
        const { name, value } = e.target;
        setPassword({
            ...password,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!password.newPassword || !password.confirmPassword) {
            toast.error('All fields are required');
            return;
        }
        if (!isValidPassword(password.newPassword)) {
            toast.error('Check your new password');
            return;
        }
        if (!isValidPassword(password.confirmPassword)) {
            toast.error('Check your confirm password');
            return;
        }
        if (password.newPassword !== password.confirmPassword) {
            toast.error('Confirm password do not match with new password');
            return;
        }
        const res = await dispatch(
            resetPassword({ password: password.newPassword, id })
        );
        if (res?.payload?.success) navigate(-1);
        setPassword({
            newPassword: '',
            confirmPassword: '',
        });
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-2xl w-[300px] border ">
                    <h1 className="text-center text-2xl font-bold">
                        New Password
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="font-semibold">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your old password....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={userInput}
                            value={password.newPassword}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="confirmPassword"
                            className="font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter your new password....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={userInput}
                            value={password.confirmPassword}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        send
                    </button>
                    <p className="text-center flex items-center justify-center">
                        <Link
                            to="/login"
                            className="link text-accent cursor-pointer flex items-center justify-center gap-2">
                            <AiOutlineArrowLeft /> back to the login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ResetPassword;
