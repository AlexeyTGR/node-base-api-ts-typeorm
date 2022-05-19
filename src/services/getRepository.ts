import User from '../db/entity/User';
import appDataSource from '../db/data-source';

export const userRepository = appDataSource.getRepository(User);

export default userRepository;
