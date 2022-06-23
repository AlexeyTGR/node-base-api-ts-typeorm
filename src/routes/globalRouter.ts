import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { authRouter } from './authRouters';
import { bookRouter } from './bookRouters';
import { userRouter } from './userRouters';

export const generalRouter = express.Router();

generalRouter.use('/user', userRouter);
generalRouter.use('/auth', authRouter);
generalRouter.use('/book', bookRouter);

generalRouter.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json('Not Found');
});
