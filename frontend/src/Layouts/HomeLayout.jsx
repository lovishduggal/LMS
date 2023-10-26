import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import { logout } from '../Redux/Slices/AuthSlice';
function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function fiMenu(size) {
        const fiMenu = document.querySelector('.drawer-content label > svg');
        fiMenu.style.width = fiMenu.style.height = `${size}px`;
    }

    function changeWidth(w) {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = w;
        if (w === 'fit-content') fiMenu(0);
    }

    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
        fiMenu(32);
        changeWidth(0);
    }

    async function handleLogout(e) {
        e.preventDefault();
        // dispatch logout action.
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate('/');
    }
    return (
        <div className="min-h-[90vh] ">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="cursor-pointer relative drawer-button">
                        <FiMenu
                            onClick={() => changeWidth('fit-content')}
                            size={'32px'}
                            className="font-bold m-4 text-white"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"></label>
                    <ul className="menu p-4  w-48 sm:w-80 relative bg text-base space-y-4 h-[100vh]">
                        <li className="w-fit absolute top-8 right-2 z-50">
                            <button>
                                <AiFillCloseCircle
                                    size={'24px'}
                                    onClick={hideDrawer}
                                />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/course/create">Create new course</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses">All courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="absolute bottom-[6rem] w-[90%] mx-auto">
                                <div className="w-full flex items-end justify-center">
                                    <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%] mx-auto">
                                <div className="w-full flex items-end justify-center">
                                    <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}
export default HomeLayout;
