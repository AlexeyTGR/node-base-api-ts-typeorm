import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import dayjs from 'dayjs';
import userRepository from '../../services/getRepository';
import constants from '../../utils/constants';

type ReqQuery = {
  page?: string;
  take?: string;
  order?: string;
  orderDirection?: 'ASC' | 'DESC';
  find?: string;
  date?: string;
  dateTo?: string;
}
type ExtendedRequest = Request<unknown, unknown, unknown, ReqQuery>

export const getAllUsers: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const page = +req.query.page || constants.COMMON_PAGE_VALUE;
    const take = +req.query.take || constants.COMMON_TAKE_VALUE;
    const skip = take * (page - 1) || 0;
    const order = req.query.order || constants.COMMON_ORDER_NAME;
    const orderDirection = req.query.orderDirection || constants.COMMON_ORDER_DIRECTION;
    const valueToFind = req.query.find || null;
    const filterDateFrom = req.query.date || null;
    const filterDateTo = req.query.dateTo || null;

    let query = userRepository.createQueryBuilder('user');
    query = query.orderBy(order, orderDirection);

    if (filterDateFrom) {
      const startOfDay: dayjs.Dayjs = dayjs(filterDateFrom).startOf('day');
      const endOfDay: dayjs.Dayjs = (filterDateTo)
        ? dayjs(filterDateTo).endOf('day')
        : startOfDay.clone().endOf('day');

      query = query.andWhere('user.dob BETWEEN :startDate AND :endDate', { startDate: startOfDay.toDate(), endDate: endOfDay.toDate() });
    }
    if (valueToFind) {
      query = query.andWhere('(user.email ILIKE :searchString OR user.name ILIKE :searchString)', { searchString: `%${valueToFind}%` });
    }

    const users = await query.take(take).skip(skip).getMany();

    return res.status(StatusCodes.OK).json({ data: { users } });
  } catch (err) {
    next(err);
  }
};

export default getAllUsers;
