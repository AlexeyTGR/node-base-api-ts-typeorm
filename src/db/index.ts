import appDataSource from './data-source';
import User from './entity/User';
import Book from './entity/Book';
import Genre from './entity/Genre';

export default {
  user: appDataSource.getRepository(User),
  book: appDataSource.getRepository(Book),
  genre: appDataSource.getRepository(Genre),
};
