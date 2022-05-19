import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import createCustomError from '../utils/createCustomError';
import tokenUtils from '../utils/tokenUtils';
import db from '../db';

const checkAuth: Handler = async (req, res, next) => {
  try {
    const bearerToken: string = req.headers?.authorization || null;
    if (!bearerToken) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is not valid');
    }

    const [bearer, token] = bearerToken.split(' ');
    if (bearer !== 'Bearer') {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is not valid');
    }

    const decoded = await tokenUtils.verify(token);
    const user = await db.user.findOneBy({ id: decoded.id });

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
    }

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
