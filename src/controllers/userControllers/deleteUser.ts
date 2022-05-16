import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Repository } from 'typeorm';
import createError from '../../utils/createCustomError';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import { IRequest } from '../../middleware/checkAuth';

const userRepository: Repository<User> = appDataSource.getRepository(User);

export const deleteUser = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (+req.user.id !== +req.params.id) {
      if (req.user.role !== 'admin') {
        throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
      }
    }
    const userId = req.params.id;

    await userRepository.delete(userId);

    return res.status(200).send(`User with id = ${userId} deleted`);
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
