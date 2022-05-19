import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ExtendedRequest = Request<{ id: string }>

export const deleteUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userId = +req.params.id;
    const user = await db.user.findOneBy({
      id: userId,
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id: ${userId} not found`);
    }

    await db.user.delete(userId);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
