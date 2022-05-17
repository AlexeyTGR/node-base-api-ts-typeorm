import * as express from 'express';
import signUp from '../controllers/authControllers/signUp';
import signIn from '../controllers/authControllers/signIn';
import validator from '../middleware/validator/validator';
import { signUpSchema, signInSchema } from '../middleware/validator/authValidatorSchemas';

export const authRouter = express.Router();

authRouter.post('/signup', validator(signUpSchema), signUp);
authRouter.post('/signin', validator(signInSchema), signIn);
