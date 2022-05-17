import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';

export const checkIsAdmin: Handler = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkIsAdmin;
