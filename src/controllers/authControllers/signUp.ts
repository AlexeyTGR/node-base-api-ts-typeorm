import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import appDataSource from '../../db/data-source';
import User from '../../db/entity/User';
import tokenUtils from '../../utils/tokenUtils';

type ReqBody = {
  email: string;
  password: string;
  name: string;
  dob: string;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userData = appDataSource.getRepository(User).create(req.body);
    const user = await appDataSource.getRepository(User).save(userData);

    delete user.password;
    const token = tokenUtils.create(user.id);

    return res.status(StatusCodes.CREATED).json({ data: { message: 'User created!', user, token } });
  } catch (err) {
    next(err);
  }
};

export default signUp;
