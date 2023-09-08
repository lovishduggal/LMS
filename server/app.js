import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping', function (req, res) {
    return res.send('<h1>PONG</h1>');
});

app.use('/api/v1/user', userRoutes);

app.all('*', function (req, res) {
    return res.status(404).send('OOPS!! 404 PAGE NOT FOUND');
});

export default app;
