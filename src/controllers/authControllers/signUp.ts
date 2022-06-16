import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import tokenUtils from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';

type ReqBody = {
  email: string;
  password: string;
  name?: string;
  dob?: string | Date;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const isPasswordExist = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (isPasswordExist) {
      throw createCustomError(StatusCodes.FORBIDDEN, 'User with this email already exists');
    }
    const userData = db.user.create(req.body);
    const user = await db.user.save(userData);

    delete user.password;
    const token = tokenUtils.create(user.id);

    return res.status(StatusCodes.CREATED).json({ message: 'User created!', user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
