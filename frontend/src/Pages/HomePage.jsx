import { Link } from 'react-router-dom';

import HPM from '../Assets/images/HPM.png';
import HomeLayout from '../Layouts/HomeLayout';
function HomePage() {
    return (
        <HomeLayout>
            <div className="pt-16 text-white flex  flex-col items-center justify-center md:flex-row  gap-10 h-[90vh] w-[90%] m-auto text-center md:text-start">
                <div className="w-full h-full md:w-1/2 space-y-6 flex justify-center items-center">
                    <div className="space-y-6 ">
                        <h1 className="text-2xl  sm:text-3xl lg:text-5xl font-semibold">
                            Find out Best{' '}
                            <span className="text-yellow-500 font-bold">
                                Online Courses
                            </span>
                        </h1>
                        <p className="text-sm  sm:text-[1rem] lg:text-xl text-gray-200">
                            We have a large library of courses taught by highly
                            skilled and qualified faculties at a very affordable
                            cost.
                        </p>
                        <div className="flex flex-col items-center justify-center sm:flex-row md:justify-start gap-4">
                            <Link to="/courses">
                                <button className="text-sm bg-yellow-500 px-5 py-3 rounded-md font-semibold  cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 text-white">
                                    Explore courses
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="text-sm border border-yellow-500  px-5 py-3 rounded-md font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 text-white">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full  h-full md:w-1/2 md:h-auto flex justify-center items-center">
                    <img
                        className="object-cover"
                        src={HPM}
                        alt="homepagee image"
                    />
                </div>
            </div>
        </HomeLayout>
    );
}
export default HomePage;
