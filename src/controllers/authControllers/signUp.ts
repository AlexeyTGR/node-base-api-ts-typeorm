import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import tokenUtils from '../../utils/tokenUtils';
import db from '../../db';

type ReqBody = {
  email: string;
  password: string;
  name?: string;
  dob?: string | Date;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    // let userData = req.body;
    // if (!req.body.name) {
    //   userData = {
    //     email: req.body.email,
    //     password: req.body.password,
    //     name: req.body.name || 'John Doe',
    //     dob: req.body.dob || '2000-01-01',
    //   };
    // }
    const userData = db.user.create(req.body);
    const user = await db.user.save(userData);

    delete user.password;
    const token = tokenUtils.create(user.id);

    return res.status(StatusCodes.CREATED).json({ data: { message: 'User created!', user, token } });
  } catch (err) {
    next(err);
  }
};

export default signUp;
