import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import createCustomError from '../utils/createCustomError';
import tokenUtils from '../utils/tokenUtils';
import db from '../db';

const getUserFromToken = async (authHeader?: string) => {
  if (!authHeader) {
    throw createCustomError(StatusCodes.UNAUTHORIZED, 'Token is not valid');
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    throw createCustomError(StatusCodes.UNAUTHORIZED, 'Token is not valid');
  }

  const decoded = await tokenUtils.verify(token).catch((err) => {
    if (err.message === 'jwt expired') {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'Token expired');
    }
    if (err.message === 'jwt malformed') {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'Token is not valid');
    }
    throw err;
  });

  const user = await db.user.findOne({
    relations: {
      ratings: { book: true },
      favorites: true,
    },
    where: { id: decoded.id },
  });
  if (!user) {
    throw createCustomError(StatusCodes.NOT_FOUND, 'Token is not valid');
  }

  return user;
};

export const checkAuth: Handler = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req.headers?.authorization);

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};

export const readUserFromToken: Handler = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req.headers?.authorization).catch(() => null);
    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};

export default { checkAuth, readUserFromToken };
