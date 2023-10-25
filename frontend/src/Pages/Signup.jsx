import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isValidEmail, isValidPassword } from '../Helpers/regexMatcher';
import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/Slices/AuthSlice';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
        avatar: '',
    });
    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    }
    function getImage(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    }
    async function createNewAccount(e) {
        e.preventDefault();
        if (
            !signupData.email ||
            !signupData.password ||
            !signupData.fullName ||
            !signupData.avatar
        ) {
            toast.error('Please fill all the details');
            return;
        }
        if (signupData.fullName.length < 5) {
            toast.error('Please should be atleast 5 characters');
            return;
        }
        if (!isValidEmail(signupData.email)) {
            toast.error('Invalid email address');
            return;
        }
        if (!isValidPassword(signupData.password)) {
            toast.error(
                'Password  must be  8 or greater than 8 characters long. Password must contains a number,  lower case alphabet, upper case alphabet, and special character'
            );
            return;
        }
        const formData = { ...signupData };
        const res = await dispatch(createAccount(formData));
        if (res?.payload?.success) navigate('/');

        setSignupData({
            fullName: '',
            email: '',
            password: '',
            avatar: '',
        });
        setPreviewImage('');
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={createNewAccount}
                    noValidate
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-2xl w-[300px] border ">
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img
                                className="w-24 h-24 rounded-full m-auto"
                                src={previewImage}
                            />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        type="file"
                        className="hidden"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-semibold">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="name"
                            placeholder="Enter your full name....."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        Create Account
                    </button>
                    <p className="text-center">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Signup;
