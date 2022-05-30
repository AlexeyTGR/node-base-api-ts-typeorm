import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import tokenUtils from '../../utils/tokenUtils';

type ExtendedRequest = Request<{ id: string }>

export const getOne: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const user = req.user;
    const token = tokenUtils.create(user.id);

    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default getOne;
