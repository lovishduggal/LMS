import { useNavigate } from 'react-router-dom';
function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center  bg-[#1a2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <a className="inline-block btn-secondary bg-red-500 px-4 py-2 rounded text-xl font-medium hover:bg-red-800 transition-all ease-in-out duration-300">
                    <span onClick={() => navigate(-1)}>Go Back</span>
                </a>
            </button>
        </div>
    );
}
export default NotFound;
