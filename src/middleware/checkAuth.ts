import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import createError from '../utils/createCustomError';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';
import tokenUtils from '../utils/tokenUtils';

const userRepository = appDataSource.getRepository(User);

const checkAuth: Handler = async (req, res, next) => {
  try {
    const bearerToken: string = req.headers?.authorization || null;
    if (bearerToken) {
      const token: string = bearerToken.split(' ')[1];
      const result = await tokenUtils.verify(token);
      const user = await userRepository.findOneBy({
        id: +result,
      });
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, 'User not found');
      }
      req.user = user;

      return next();
    }
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
