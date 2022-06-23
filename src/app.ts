import express from 'express';
import cors from 'cors';

import { StatusCodes } from 'http-status-codes';
import { userRouter } from './routes/userRouters';
import { authRouter } from './routes/authRouters';
import { bookRouter } from './routes/bookRouters';
import errorHandler from './middleware/errorHandler';
import config from './config';

import type from './type'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: [`${config.clientURL}`] }));
app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json('Not Found');
});

app.use(errorHandler);

export default app;
