import { User } from './db/entity/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
