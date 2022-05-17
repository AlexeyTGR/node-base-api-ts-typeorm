import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import { Repository } from 'typeorm';
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
  name: string;
  dob: string;
}
>

export const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    if (!req.body.email && !req.body.password) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'Not enough data to registration');
    }

    const {
      email,
      password,
      name,
      dob,
    } = req.body;

    const newUser = {
      email,
      password,
      name,
      dob,
    };

    const user = userRepository.create(newUser);
    await userRepository.save(user);
    if (!user) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    delete user.password;
    delete user.role;

    const token: string = tokenUtils.create(user.id);

    return res.status(StatusCodes.CREATED).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
