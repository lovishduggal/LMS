import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
// import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import AddLecture from './Pages/Dashboard/AddLecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import DisplayLectures from './Pages/Dashboard/DisplayLectures';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Checkout from './Pages/Payment/Checkout';
import CheckoutFail from './Pages/Payment/CheckoutFail';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import Signup from './Pages/Signup';
import EditProfile from './Pages/User/EditProfile';
import Profile from './Pages/User/Profile';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/denied" element={<Denied />} />

                <Route
                    path="/course/description"
                    element={<CourseDescription />}
                />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                    <Route path="/course/create" element={<CreateCourse />} />
                    <Route path="/course/addlecture" element={<AddLecture />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                </Route>

                <Route
                    element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
                    <Route path="/user/profile" element={<Profile />} />
                    <Route path="/user/editprofile" element={<EditProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                        path="/course/displaylectures"
                        element={<DisplayLectures />}
                    />
                    <Route
                        path="/checkout/success"
                        element={<CheckoutSuccess />}
                    />
                    <Route path="/checkout/fail" element={<CheckoutFail />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
        </>
    );
};
export default App;
