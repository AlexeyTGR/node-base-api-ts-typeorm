import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserRole } from 'src/db/entity/User';
import createCustomError from '../../utils/createCustomError';
import passwordUtils from '../../utils/passwordUtils';
import db from '../../db';
import constants from '../../utils/constants';

type BodyType = {
  role?: (() => string) | QueryDeepPartialEntity<UserRole>;
  email?: string;
  name?: string;
  oldPassword?: string;
  password?: string;
}
type ExtendedRequest = Request<{ id: string; }, unknown, BodyType>

export const updateUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userId: number = +req.params.id;
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id: ${userId} not found`);
    }

    const dataToChange = req.body;

    if (req.body.password) {
      dataToChange.oldPassword = passwordUtils.hash(req.body.oldPassword);

      if (dataToChange.oldPassword !== user.password) {
        throw createCustomError(StatusCodes.FORBIDDEN, 'Wrong old password');
      }

      dataToChange.password = passwordUtils.hash(req.body.password);
      delete dataToChange.oldPassword;
    }
    if (req.body.role && req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Only admin can change the role');
    }

    await db.user.update(userId, dataToChange);

    const updatedUser = await db.user.findOneBy({ id: userId });
    if (!updatedUser) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    return res.status(StatusCodes.OK).json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export default updateUser;
