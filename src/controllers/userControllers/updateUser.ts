import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createCustomError from '../../utils/createCustomError';
import passwordUtils from '../../utils/passwordUtils';
import db from '../../db';

type BodyType = {
  role?: string;
  email?: string;
  name?: string;
  password?: string;
}
type ExtendedRequest = Request<{ id: string; }, unknown, BodyType>

export const updateUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userId: number = +req.params.id;
    const user = await db.user.findOneBy({
      id: userId,
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id: ${userId} not found`);
    }

    const dataToChange: any = req.body;
    if (req.body.password) {
      dataToChange.password = passwordUtils.hash(req.body.password);
    }
    if (req.body.role && req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Only admin can change the role');
    }

    await db.user.update(userId, dataToChange);

    const updatedUser = await db.user.findOneBy({ id: userId });

    return res.status(StatusCodes.OK).json({ data: { message: 'Done!', user: updatedUser } });
  } catch (err) {
    next(err);
  }
};

export default updateUser;
