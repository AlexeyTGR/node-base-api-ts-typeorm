import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import { Repository } from 'typeorm';
import passwordUtils from '../../utils/passwordUtils';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';

const userRepository: Repository<User> = appDataSource.getRepository(User);

type ExtendedRequest = Request<
unknown,
unknown,
{
  email: string;
  password: string;
}
>

export const signIn: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await userRepository.findOne({
      where: { email },
      select: ['id', 'password'],
    });

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isVerified = passwordUtils.verify(password, user.password);
    if (!isVerified) {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Wrong password');
    }

    const token = tokenUtils.create(user.id);

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      dob: user.dob,
    };

    return res.status(StatusCodes.OK).json({ message: 'You are signed in', token });
  } catch (err) {
    next(err);
  }
};

export default signIn;
