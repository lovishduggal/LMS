import { Route, Routes } from 'react-router-dom';

// import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';

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

                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
        </>
    );
};
export default App;
