import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './Redux/store.js';
import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider value={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
