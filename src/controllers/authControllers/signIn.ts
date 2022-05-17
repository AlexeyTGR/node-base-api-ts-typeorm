import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import passwordUtils from '../../utils/passwordUtils';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';

type ExtendedRequest = Request<unknown, unknown, { email: string; password: string; }>

export const signIn: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await appDataSource.getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isVerified = passwordUtils.verify(password, user.password);
    if (!isVerified) {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Wrong password');
    }

    const token = tokenUtils.create(user.id);
    delete user.password;

    return res.status(StatusCodes.OK).json({ data: { message: 'You are signed in', user, token } });
  } catch (err) {
    next(err);
  }
};

export default signIn;
