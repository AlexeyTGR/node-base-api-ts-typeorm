import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import constants from '../utils/constants';

export const checkIsAdmin: Handler = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, constants.COMMON_NOT_ALLOWED_MESSAGE);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkIsAdmin;
