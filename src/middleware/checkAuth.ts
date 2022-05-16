import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import createError from '../utils/createCustomError';
import appDataSource from '../db/data-source';
import User, { UserRole } from '../db/entity/User';
import tokenUtils from '../utils/tokenUtils';

export interface IRequest extends Request {
  user: {
    id: number;
    email: string;
    name: string;
    dob: Date;
    role: UserRole
  },
}
const userRepository = appDataSource.getRepository(User);

const checkAuth = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bearerToken: string = req.headers?.authorization || null;
    if (bearerToken) {
      const token: string = bearerToken.split(' ')[1];
      const result = await tokenUtils.verify(token);
      const user = await userRepository.findOneBy({
        id: +result,
      });
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, 'User not found');
      }
      req.user = user;

      return next();
    }
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
