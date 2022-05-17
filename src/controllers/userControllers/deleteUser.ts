import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import createCustomError from '../../utils/createCustomError';

type ExtendedRequest = Request<{ id: string }>

export const deleteUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userId = +req.params.id;
    const user = await appDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id: ${userId} not found`);
    }

    await appDataSource.getRepository(User).delete(userId);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
