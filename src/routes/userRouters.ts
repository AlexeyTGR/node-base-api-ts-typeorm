import * as express from 'express';
import checkAuth from '../middleware/checkAuth';
import getAllUsers from '../controllers/userControllers/getAllUsers';
import getProfile from '../controllers/userControllers/getProfile';
import updateUser from '../controllers/userControllers/updateUser';
import deleteUser from '../controllers/userControllers/deleteUser';
import createValidatorMiddleware from '../utils/validator/validator';
import validator from '../utils/validator/userValidatorSchemas';
import checkIsAdmin from '../middleware/checkIsAdmin';
import checkAccessRight from '../middleware/checkAccessRights';
import getUser from '../controllers/userControllers/getUser';

export const userRouter = express.Router();

userRouter.use(checkAuth);
userRouter.get('/all', createValidatorMiddleware(validator.getAllUsers), checkIsAdmin, getAllUsers);
userRouter.get('/me', getProfile);
userRouter.get('/:id', createValidatorMiddleware(validator.getUser), checkIsAdmin, getUser);
userRouter.patch('/:id', createValidatorMiddleware(validator.updateUser), checkAccessRight, updateUser);
userRouter.delete('/:id', createValidatorMiddleware(validator.deleteUser), checkAccessRight, deleteUser);
