import { Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import HomePage from './Pages/HomePage';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
            <Footer />
        </>
    );
};
export default App;
