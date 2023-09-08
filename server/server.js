import { config } from 'dotenv';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectionToDb();
    console.log(`listening on ${PORT}`);
});
