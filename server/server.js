import { config } from 'dotenv';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';
import { v2 } from 'cloudinary';
config();

const PORT = process.env.PORT || 5000;

//! Configuration the cloudinary:
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
    connectionToDb();
    console.log(`listening on ${PORT}`);
});
