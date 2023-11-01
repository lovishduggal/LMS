import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { changePassword } from '../../Redux/Slices/AuthSlice';

function ChangePassword() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
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
        if (!password.oldPassword || !password.newPassword) {
            toast.error('All fields are required');
            return;
        }
        await dispatch(changePassword({ ...password }));
        setPassword({
            oldPassword: '',
            newPassword: '',
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
                        Change Password
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="font-semibold">
                            Old Password
                        </label>
                        <input
                            type="password"
                            required
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your old password....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={userInput}
                            value={password.oldPassword}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="font-semibold">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={userInput}
                            value={password.newPassword}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        Change Password
                    </button>
                    <p className="text-center flex items-center justify-center">
                        <Link
                            to="/user/profile"
                            className="link text-accent cursor-pointer flex items-center justify-center gap-2">
                            <AiOutlineArrowLeft /> back to the profile
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
