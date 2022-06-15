import appDataSource from './data-source';
import User from './entity/User';
import Book from './entity/Book';
import Genre from './entity/Genre';
import Rating from './entity/Rating';
import Comment from './entity/Comment';

export default {
  user: appDataSource.getRepository(User),
  book: appDataSource.getRepository(Book),
  genre: appDataSource.getRepository(Genre),
  rating: appDataSource.getRepository(Rating),
  comment: appDataSource.getRepository(Comment),
};
