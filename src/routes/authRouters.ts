import * as express from 'express';
// import validator from '../middleware/validator';
// import * as authController from '../controllers/authControllers/authController';
import signUp from '../controllers/authControllers/signUp';
import signIn from '../controllers/authControllers/signIn';
import { validator, signInSchema, signUpSchema } from '../middleware/validator';

export const authRouter = express.Router();

authRouter.post('/signup', validator(signUpSchema), signUp);
authRouter.post('/signin', validator(signInSchema), signIn);
