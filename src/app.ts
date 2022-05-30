import express from 'express';
import cors from 'cors';

import { StatusCodes } from 'http-status-codes';
import { userRouter } from './routes/userRouters';
import { authRouter } from './routes/authRouters';
import errorHandler from './middleware/errorHandler';

import type from './type'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.static(`${__dirname}/public`));

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json('Not Found');
});

app.use(errorHandler);

export default app;
