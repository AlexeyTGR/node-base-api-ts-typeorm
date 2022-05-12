import * as express from 'express';
import * as userController from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/:id', userController.getOne);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
