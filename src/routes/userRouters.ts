import * as express from 'express';
import * as userController from '../controllers/userController';
import checkAuth from '../middleware/checkAuth';

export const userRouter = express.Router();

userRouter.use(checkAuth);
userRouter.get('/all', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
