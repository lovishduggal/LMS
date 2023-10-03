import { config } from 'dotenv';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';
import { v2 } from 'cloudinary';
import Razorpay from 'razorpay';
config();

const PORT = process.env.PORT || 5000;

//! Configuration the cloudinary:
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, () => {
    connectionToDb();
    console.log(`listening on ${PORT}`);
});
