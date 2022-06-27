import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';

type ExtendedRequest = Request<{ id: string }>

export const getOne: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const user = req.user;

    return res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getOne;
