import * as express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import uploadAvatar from '../controllers/userControllers/uploadAvatar';
import getAllUsers from '../controllers/userControllers/getAllUsers';
import getProfile from '../controllers/userControllers/getProfile';
import updateUser from '../controllers/userControllers/updateUser';
import deleteUser from '../controllers/userControllers/deleteUser';
import createValidatorMiddleware from '../utils/validator/validator';
import validator from '../utils/validator/userValidatorSchemas';
import getUser from '../controllers/userControllers/getUser';

export const userRouter = express.Router();

userRouter.use(checkAuth);
userRouter.get('/all', createValidatorMiddleware(validator.getAllUsers), getAllUsers);
userRouter.get('/me', getProfile);
userRouter.post('/upload-avatar', createValidatorMiddleware(validator.uploadAvatar), uploadAvatar);
userRouter.get('/:id', createValidatorMiddleware(validator.getUser), getUser);
userRouter.patch('/:id', createValidatorMiddleware(validator.updateUser), updateUser);
userRouter.delete('/:id', createValidatorMiddleware(validator.deleteUser), deleteUser);
