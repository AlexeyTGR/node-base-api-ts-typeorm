import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import createError from '../../utils/createCustomError';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import { IRequest } from '../../middleware/checkAuth';

const userRepository: Repository<User> = appDataSource.getRepository(User);

export const getAllUsers = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const page: number = +req.query.page || 1;
    const take: number = +req.query.take || 100;
    const skip = take * (page - 1) || 0;
    const order = typeof req.query.order === 'string'
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

    let query = userRepository.createQueryBuilder('user');
    if (orderDirection === 'ASC') {
      query = query.orderBy(order, 'ASC');
    } else {
      query = query.orderBy(order, 'DESC');
    }

    if (filterDateFrom) {
      query = query.andWhere('user.dob BETWEEN :startDate AND :endDate', { startDate: startOfDay.toDate(), endDate: endOfDay.toDate() });
    }
    if (valueToFind) {
      query = query.andWhere('(user.email ILIKE :searchString OR user.name ILIKE :searchString)', { searchString: `%${valueToFind}%` });
    }
    query = query.take(take);
    query = query.skip(skip);

    const users = await query.getMany();
    if (!users) {
      createError(StatusCodes.NOT_FOUND, 'Users not found');
    }

    return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export default getAllUsers;
