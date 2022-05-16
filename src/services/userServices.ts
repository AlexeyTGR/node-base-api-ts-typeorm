import { StatusCodes } from 'http-status-codes';
import User from '../db/entity/User';
import appDataSource from '../db/data-source';
import createCustomError from '../utils/createCustomError';

const userRepository = appDataSource.getRepository(User);

const updateUserData = async (id: number, data: object): Promise<void> => {
  try {
    await userRepository.update(id, data);
  } catch (err) {
    throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export default updateUserData;
