import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';

import passwordUtils from '../../utils/passwordUtils';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';
import db from '../../db';

type ExtendedRequest = RequestHandler<unknown, unknown, { email: string; password: string; }>

export const signIn: ExtendedRequest = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User with this email not found');
    }

    const isPasswordsMatch = passwordUtils.verify(password, user.password);

    if (!isPasswordsMatch) {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Wrong password');
    }

    const [token, refreshToken] = await tokenUtils.createPair(user.id);
    delete user.password;

    return res.status(StatusCodes.OK).json({ user, token, refreshToken, message: 'You are signed in' });
  } catch (err) {
    next(err);
  }
};

export default signIn;
