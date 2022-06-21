import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import createCustomError from '../utils/createCustomError';
import tokenUtils from '../utils/tokenUtils';
import db from '../db';

const createCheckAuthMiddleware = (type: 'private' | 'public'): Handler => {
  return (async (req, res, next) => {
    try {
      const bearerToken: string = req.headers?.authorization || null;
      if (!bearerToken && type === 'private') {
        throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is not valid');
      }
      if (bearerToken) {
        const [bearer, token] = bearerToken.split(' ');
        if (bearer !== 'Bearer' && type === 'private') {
          throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is not valid');
        }

        const decoded = await tokenUtils.verify(token);
        const user = await db.user.findOne({
          relations: {
            ratings: { book: true },
            favorites: true,
          },
          where: { id: decoded.id },
        });

        if (!user && type === 'private') {
          throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
        }
        req.user = user;

        return next();
      }

      req.user = null;

      return next();
    } catch (err) {
      next(err);
    }
  });
};

export default createCheckAuthMiddleware;
