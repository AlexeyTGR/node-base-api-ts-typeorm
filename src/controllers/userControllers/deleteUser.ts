import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import { Repository } from 'typeorm';
import createError from '../../utils/createCustomError';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
// import { IRequest } from '../../middleware/checkAuth';

const userRepository: Repository<User> = appDataSource.getRepository(User);

type ExtendedRequest = Request<{ id: string }>

export const deleteUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    if (req.user.id !== +req.params.id && req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }
    const userId = req.params.id;

    await userRepository.delete(userId);

    return res.status(StatusCodes.NO_CONTENT).json(`User with id = ${userId} deleted`);
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
