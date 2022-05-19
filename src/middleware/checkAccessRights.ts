import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import constants from '../utils/constants';

type ExtendedRequest = Request<{ id: string }>

export const checkAccessRight: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    if (req.user.id !== +req.params.id && req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, constants.COMMON_NOT_ALLOWED_MESSAGE);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAccessRight;
