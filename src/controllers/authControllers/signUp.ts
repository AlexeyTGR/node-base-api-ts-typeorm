import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';

const userRepository: Repository<User> = appDataSource.getRepository(User);

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
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

    const token:string = tokenUtils.create(user.id);

    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
