import appDataSource from './data-source';
import User from './entity/User';

export default {
  user: appDataSource.getRepository(User),
};
