import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import createCustomError from '../utils/createCustomError';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';
import tokenUtils from '../utils/tokenUtils';

const checkAuth: Handler = async (req, res, next) => {
  try {
    const bearerToken: string = req.headers?.authorization || null;
    if (bearerToken) {
      const [bearer, token] = bearerToken.split(' ');
      if (bearer !== 'Bearer') {
        throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is not valid');
      }
      const result = await tokenUtils.verify(token);
      const user = await appDataSource.getRepository(User).findOneBy({
        id: result.id,
      });
      if (!user) {
        throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
      }
      req.user = user;

      return next();
    }
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
