import * as express from 'express';
import signUp from '../controllers/authControllers/signUp';
import signIn from '../controllers/authControllers/signIn';
import createValidatorMiddleware from '../utils/validator/validator';
import validator from '../utils/validator/authValidatorSchemas';
import checkRefreshJWT from '../controllers/authControllers/checkRefreshJWT';

export const authRouter = express.Router();

authRouter.post('/signup', createValidatorMiddleware(validator.signUp), signUp);
authRouter.post('/signin', createValidatorMiddleware(validator.signIn), signIn);
authRouter.post('/check-token', checkRefreshJWT);
