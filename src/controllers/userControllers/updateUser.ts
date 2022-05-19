import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import createCustomError from '../../utils/createCustomError';
import updateUserData from '../../services/userServices';
import passwordUtils from '../../utils/passwordUtils';
import userRepository from '../../services/getRepository';

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
    const user = await userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `User with id: ${userId} not found`);
    }

    const dataToChange = req.body;
    if (req.body.password) {
      const hashedPassword = passwordUtils.hash(req.body.password);
      dataToChange.password = hashedPassword;
    }
    if (req.body.role && req.user.role !== 'admin') {
      throw createCustomError(StatusCodes.FORBIDDEN, 'Only admin can change the role');
    }

    await updateUserData(userId, dataToChange);

    const updatedUser = await userRepository.findOneBy({
      id: userId,
    });

    return res.status(StatusCodes.OK).json({ data: { message: 'Done!', updatedUser } });
  } catch (err) {
    next(err);
  }
};

export default updateUser;
