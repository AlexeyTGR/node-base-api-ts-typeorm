import { StatusCodes } from 'http-status-codes';
import createError from '../utils/createCustomError';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';
import updateUserData from '../services/userServices';

const userRepository = appDataSource.getRepository(User);

export const getAll = async (req, res) => {
  try {
    const page: number = +req.query.page || 1;
    const take: number = +req.query.take || 100;
    const skip: number = take * (page - 1) || 0;
    const orderBy = req.query.order || 'id';
    const orderDirection: string = req.query.orderDirection || 'ASC';
    console.log('orderDirection >>', orderDirection);

    if (req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }

    const users = await userRepository.find({
      order: {
        [orderBy]: [orderDirection],
      },
      skip,
      take,
    });

    if (!users) {
      createError(StatusCodes.NOT_FOUND, 'Users not found');
    }

    return res.status(200).send(users);
  } catch (err) {
    return res.status(err.code).send({ message: err.text });
  }
};

export const getOne = async (req, res) => {
  if (+req.user.id !== +req.params.id) {
    if (req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }
  }
  const user = req.user;

  return res.status(200).json({ message: 'Hello man', user });
};

export const deleteUser = async (req, res) => {
  try {
    if (+req.user.id !== +req.params.id) {
      if (req.user.role !== 'admin') {
        throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
      }
    }
    const userId = req.params.id;

    await userRepository.delete(userId);

    return res.status(200).send(`User with id = ${userId} deleted`);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};

export const updateUser = async (req, res, next) => {
  // try {
  if (+req.user.id !== +req.params.id) {
    if (req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }
  }
  const userId = req.params.id;
  await updateUserData(userId, req.body);

  return res.status(200).send('Done!');
  // } catch (err) {
  //   next(err);
  // }
};

export default {};
