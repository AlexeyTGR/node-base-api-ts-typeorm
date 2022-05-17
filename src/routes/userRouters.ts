import * as express from 'express';
import checkAuth from '../middleware/checkAuth';
import getAllUsers from '../controllers/userControllers/getAllUsers';
import getOne from '../controllers/userControllers/getUser';
import updateUser from '../controllers/userControllers/updateUser';
import deleteUser from '../controllers/userControllers/deleteUser';
import createValidatorMiddleware from '../utils/validator/validator';
import validator from '../utils/validator/userValidatorSchemas';
import checkIsAdmin from '../middleware/checkIsAdmin';

export const userRouter = express.Router();

userRouter.use(checkAuth);
userRouter.get('/all', checkIsAdmin, getAllUsers);
userRouter.get('/:id', createValidatorMiddleware(validator.getUser), getOne);
userRouter.patch('/:id', createValidatorMiddleware(validator.updateUser), updateUser);
userRouter.delete('/:id', createValidatorMiddleware(validator.deleteUser), deleteUser);
