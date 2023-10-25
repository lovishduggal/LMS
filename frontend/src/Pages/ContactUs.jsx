import { useState } from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../Helpers/axiosInstance';
import { isValidEmail } from '../Helpers/regexMatcher';
import HomeLayout from '../Layouts/HomeLayout';

function ContactUs() {
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        message: '',
    });

    function handleInputChanges(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error('All fields are required');
            return;
        }

        if (!isValidEmail(userInput.email)) {
            toast.error('Invalid email address');
            return;
        }

        try {
            const response = axiosInstance.post('/user/contact', userInput);

            toast.promise(response, {
                loading: 'Submitting your message...',
                success: 'Form submitted successfully',
                error: 'Failed to submit the form',
            });

            const result = await response;
            if (result?.data?.success) {
                setUserInput({
                    name: '',
                    email: '',
                    message: '',
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-2xl w-[300px]">
                    <h1 className="text-3xl font-semibold">Contact Form</h1>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            id="name"
                            onChange={handleInputChanges}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="text"
                            name="email"
                            placeholder="Enter your name"
                            id="email"
                            onChange={handleInputChanges}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            name="message"
                            placeholder="Enter your name"
                            id="message"
                            onChange={handleInputChanges}
                            value={userInput.message}
                        />
                    </div>
                    <button className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 cursor-pointer font-semibold text-xl">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}
export default ContactUs;
