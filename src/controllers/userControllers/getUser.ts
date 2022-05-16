import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import createError from '../../utils/createCustomError';
import { IRequest } from '../../middleware/checkAuth';

export const getOne = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (+req.user.id !== +req.params.id) {
      if (req.user.role !== 'admin') {
        throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
      }
    }
    const user = req.user;

    return res.status(200).json({ message: 'Hello man', user });
  } catch (err) {
    next(err);
  }
};

export default getOne;
