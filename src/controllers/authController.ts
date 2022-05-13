import { StatusCodes } from 'http-status-codes';
import verifyPassword from '../middleware/verifyPassword';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';
import createError from '../utils/createCustomError';
import { createToken } from '../utils/token';

const userRepository = appDataSource.getRepository(User);

export const signUp = async (req, res) => {
  try {
    if (!req.body.email && !req.body.password) {
      throw createError(StatusCodes.NOT_FOUND, 'Not enough data to registration');
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

    const user = await userRepository.create(newUser);
    await userRepository.save(user);
    if (!user) {
      throw createError(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const token = createToken(user.id);

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.sendStatus(err.code);
  }
};

export const signIn = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw createError(StatusCodes.NOT_FOUND, 'User not found');
    }
    const isVerified = verifyPassword(password, user.password);
    if (!isVerified) {
      throw createError(StatusCodes.FORBIDDEN, 'Wrong password');
    }

    const token = createToken(user.id);

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      dob: user.dob,
    };

    return res.status(200).send({ message: 'You are signed in', token });
  } catch (err) {
    return res.status(err.code).send({ message: err.text });
  }
};

export default {};
