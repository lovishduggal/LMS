import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
function HomeLayout({ children }) {
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
    return (
        <div className="min-h-[90vh]">
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
                            className="font-bold  absolute left-4 top-4 text-white"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"></label>
                    <ul className="menu p-4  w-48 sm:w-80 relative bg text-base">
                        <li className="w-fit absolute right-2 z-50">
                            <button>
                                <AiFillCloseCircle
                                    size={'24'}
                                    onClick={hideDrawer}
                                />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses">All courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
}
export default HomeLayout;
