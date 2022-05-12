import * as express from 'express';
import * as authController from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/signin', authController.signIn);
