import { useNavigate } from 'react-router-dom';

function CourseCard({ data }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate('/course/description', { state: data })}
            className="text-white w-[22rem] h-auto shadow-lg rounded-lg cursor-pointer overflow-hidden bg-zinc-700">
            <div className="overflow-hidden">
                <img
                    className="h-48 w-full rounded-tl-lg rounded-tr-lg hover:scale-[1.05] transition-all ease-in-out duration-300"
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                />
                <div className="p-3 space-y-1 text-white">
                    <h2>{data?.title}</h2>
                    <p className="line-clamp-2">{data?.description}</p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                            Category:{' '}
                        </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                            Totals lectures:{' '}
                        </span>
                        {data?.numbersOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                            Instructor:{' '}
                        </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default CourseCard;
