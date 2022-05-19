import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ExtendedRequest = Request<{ id: string }>

export const getUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userId: number = +req.params.id;
    const user = await db.user.findOneBy({
      id: userId,
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id ${userId} is not found`);
    }

    return res.status(StatusCodes.OK).json({ data: { user } });
  } catch (err) {
    next(err);
  }
};

export default getUser;
