import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

function CheckoutFail() {
    return (
        <HomeLayout>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md text-center space-y-2">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-lg mb-4">
                        We are sorry, but the payment was unsuccessful.
                    </p>
                    <p className="text-sm text-gray-600">
                        Please try again or contact support.
                    </p>
                    <button className="link text-zinc-500">
                        <Link to="/checkout">Go to checkout</Link>
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}
export default CheckoutFail;
