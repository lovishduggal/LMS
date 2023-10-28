import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

function CheckoutSuccess() {
    return (
        <HomeLayout>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-lg mb-4">Thank you for your purchase.</p>
                    <p className="text-sm text-gray-600">
                        Your order will be processed shortly.
                    </p>
                    <button className="link text-zinc-500">
                        <Link to="/">Go to Homepage</Link>
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}
export default CheckoutSuccess;
