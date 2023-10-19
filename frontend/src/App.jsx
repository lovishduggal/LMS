import { Route, Routes } from 'react-router-dom';

// import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
        </>
    );
};
export default App;
