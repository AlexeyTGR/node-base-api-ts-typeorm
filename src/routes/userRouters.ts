import * as express from 'express';
import checkAuth from '../middleware/checkAuth';
import getAllUsers from '../controllers/userControllers/getAllUsers';
import getOne from '../controllers/userControllers/getUser';
import updateUser from '../controllers/userControllers/updateUser';
import deleteUser from '../controllers/userControllers/deleteUser';
import { validator, updateUserSchema, getUserSchema, deleteUserSchema } from '../middleware/validator';

export const userRouter = express.Router();

userRouter.use(checkAuth);
userRouter.get('/all', getAllUsers);
userRouter.get('/:id', validator(getUserSchema), getOne);
userRouter.patch('/:id', validator(updateUserSchema), updateUser);
userRouter.delete('/:id', validator(deleteUserSchema), deleteUser);
