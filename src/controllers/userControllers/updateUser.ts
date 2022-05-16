import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import createError from '../../utils/createCustomError';
import updateUserData from '../../services/userServices';
import { IRequest } from '../../middleware/checkAuth';
import passwordUtils from '../../utils/passwordUtils';

export const updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (+req.user.id !== +req.params.id) {
      if (req.user.role !== 'admin') {
        throw createError(StatusCodes.FORBIDDEN, 'you are not allowed to access this data');
      }
    }

    const userId: number = +req.params.id;
    if (req.body.password) {
      const hashedPassword = passwordUtils.hash(req.body.password);
      req.body.password = hashedPassword;
    }

    await updateUserData(userId, req.body);

    return res.status(200).send('Done!');
  } catch (err) {
    next(err);
  }
};

export default updateUser;
