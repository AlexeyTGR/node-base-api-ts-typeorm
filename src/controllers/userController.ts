import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { Between, ILike, Repository } from 'typeorm';
import dayjs from 'dayjs';
import createError from '../utils/createCustomError';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';
import updateUserData from '../services/userServices';
import { IRequest } from '../middleware/checkAuth';

interface IFindAllOptions {
  order: object;
  skip: number;
  take: number;
  where?;
}

const userRepository: Repository<User> = appDataSource.getRepository(User);

export const getAll = async (req: IRequest, res: Response) => {
  try {
    const page: number = +req.query.page || 1;
    const take: number = +req.query.take || 100;
    const skip = take * (page - 1) || 0;
    const orderBy = typeof req.query.order === 'string'
      ? req.query.order : 'id';
    const orderDirection = typeof req.query.orderDirection === 'string'
      ? req.query.orderDirection : 'ASC';
    const valueToFind = typeof req.query.find === 'string'
      ? req.query.find : null;
    const filterDateFrom = typeof req.query.date === 'string'
      ? req.query.date : null;
    const filterDateTo = typeof req.query.dateTo === 'string'
      ? req.query.dateTo : null;

    if (req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }

    const startOfDay: dayjs.Dayjs = dayjs(filterDateFrom).startOf('day');
    const endOfDay: dayjs.Dayjs = (filterDateTo)
      ? dayjs(filterDateTo).endOf('day')
      : startOfDay.clone().endOf('day');

    const findAllOptions: IFindAllOptions = {
      order: {
        [orderBy]: orderDirection,
      },
      skip,
      take,
      where: [
        {
          name: ILike(`%${valueToFind}%`),
          dob: Between(startOfDay, endOfDay),
        },
        {
          email: ILike(`%${valueToFind}%`),
          dob: Between(startOfDay, endOfDay),
        },
      ],
    };

    if (!valueToFind && !filterDateFrom) {
      delete findAllOptions.where;
    }
    if (!filterDateFrom) {
      findAllOptions.where.forEach((item) => {
        delete item.dob;
      });
    }
    if (!valueToFind) {
      findAllOptions.where.forEach((item) => {
        return item.name ? delete item.name : delete item.email;
      });
    }

    const users = await userRepository.find(findAllOptions);

    if (!users) {
      createError(StatusCodes.NOT_FOUND, 'Users not found');
    }

    return res.status(200).send(users);
  } catch (err) {
    return res.status(err.code).send({ message: err.text });
  }
};

export const getOne = async (req: IRequest, res: Response) => {
  if (+req.user.id !== +req.params.id) {
    if (req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
    }
  }
  const user = req.user;

  return res.status(200).json({ message: 'Hello man', user });
};

export const deleteUser = async (req: IRequest, res: Response) => {
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

  const userId: number = +req.params.id;
  await updateUserData(userId, req.body);

  return res.status(200).send('Done!');
  // } catch (err) {
  //   next(err);
  // }
};

export default {};
