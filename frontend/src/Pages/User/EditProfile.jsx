import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowLeft, BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: '',
        fullName: '',
        avatar: '',
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setData({
                ...data,
                avatar: uploadImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function () {
                setData({
                    ...data,
                    avatar: uploadImage,
                    previewImage: this.result,
                });
            });
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error('Please fill all the details');
            return;
        }

        if (data.fullName.length < 5) {
            toast.error('Please should be atleast 5 characters');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('avatar', data.avatar);

        await dispatch(updateProfile(formData));
        await dispatch(getUserData());
        navigate('/user/profile');
    }
    return (
        <HomeLayout>
            <div className="h-screen flex items-center justify-center">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-2xl w-[300px] border">
                    <h1 className="text-center text-2xl font-bold">
                        Edit Profile
                    </h1>
                    <label htmlFor="image_uploads">
                        {data?.previewImage ? (
                            <img
                                src={data.previewImage}
                                alt="thumbnail"
                                className="w-24 h-24 rounded-full m-auto"
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
                        onChange={handleImageUpload}
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded px-2 py-1 font-semibold text-lg cursor-pointer">
                        Update Profile
                    </button>
                    <p>
                        <Link
                            to="/user/profile"
                            className="link text-accent cursor-pointer text-center flex items-center justify-center gap-2">
                            {' '}
                            <BsArrowLeft /> <span>Go back to profile</span>
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default EditProfile;
