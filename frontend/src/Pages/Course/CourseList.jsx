import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../Layouts/HomeLayout';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

function CourseList() {
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="h-[90vh] w-[90%]  max-w-[1400px] mx-auto pt-20 pl-20 flex flex-col gap-20 text-white">
                <h1 className="text-center text-3xl font-semibold">
                    Explore the courses made by{' '}
                    <span className="font-bold text-yellow-500 ">
                        Industry Experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14 items-center justify-center">
                    {courseData?.map((data) => (
                        <CourseCard key={data._id} data={data} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
export default CourseList;
