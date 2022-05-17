import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';

type ExtendedRequest = Request<{ id: string }>

export const checkAccessRight: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    if (req.user.id !== +req.params.id && req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAccessRight;
