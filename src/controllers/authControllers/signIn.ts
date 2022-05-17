import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Repository } from 'typeorm';
import { IRequest } from '../../middleware/checkAuth';
import passwordUtils from '../../utils/passwordUtils';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';

const userRepository: Repository<User> = appDataSource.getRepository(User);

export const signIn = async (req: IRequest, res: Response, next: NextFunction) => {
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

    return res.status(200).send({ message: 'You are signed in', token });
  } catch (err) {
    next(err);
  }
};

export default signIn;
