import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createError from '../../utils/createCustomError';
import updateUserData from '../../services/userServices';
import passwordUtils from '../../utils/passwordUtils';

type ExtendedRequest = Request<
{ id: string; },
unknown,
{
  role?: string;
  email?: string;
  name?: string;
  password?: string;
}
>

export const updateUser: Handler = async (req: ExtendedRequest, res, next) => {
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
    if (req.body.role && req.user.role !== 'admin') {
      throw createError(StatusCodes.FORBIDDEN, 'Only admin can change the role');
    }

    await updateUserData(userId, req.body);

    return res.status(StatusCodes.OK).send('Done!');
  } catch (err) {
    next(err);
  }
};

export default updateUser;
