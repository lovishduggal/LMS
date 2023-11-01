import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { addCourseLecture } from '../../Redux/Slices/LectureSlice';

function AddLecture() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        id: state?._id,
        title: '',
        description: '',
        videoSrc: '',
        lecture: '',
    });
    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({ ...userInput, videoSrc: source, lecture: video });
    }
    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error('All fields are mandatory');
            return;
        }
        const res = await dispatch(addCourseLecture(userInput));
        if (res?.payload?.success) {
            setUserInput({
                id: state?._id,
                title: '',
                description: '',
                videoSrc: '',
                lecture: null,
            });
        }
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}>
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new lecture
                        </h1>
                    </header>
                    <form
                        onSubmit={onFormSubmit}
                        className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter the description of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                            value={userInput.description}
                        />
                        {userInput.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"></video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label
                                    className="font-semibold text-cl cursor-pointer"
                                    htmlFor="lecture">
                                    Choose your video
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handleVideo}
                                    accept="video/mp4 video/x-mp4 video/*"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary py-1 font-semibold text-lg">
                            Add new Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}
export default AddLecture;