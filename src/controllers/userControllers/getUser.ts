import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createError from '../../utils/createCustomError';

type ExtendedRequest = Request<
{ id: string; }
>

export const getOne: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    if (+req.user.id !== +req.params.id) {
      if (req.user.role !== 'admin') {
        throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
      }
    }
    const user = req.user;

    return res.status(StatusCodes.OK).json({ message: 'Hello man', user });
  } catch (err) {
    next(err);
  }
};

export default getOne;
