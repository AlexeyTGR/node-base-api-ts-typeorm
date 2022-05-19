import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import userRepository from '../services/getRepository';

const updateUserData = async (id: number, data: object): Promise<void> => {
  try {
    await userRepository.update(id, data);
  } catch (err) {
    throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export default updateUserData;
