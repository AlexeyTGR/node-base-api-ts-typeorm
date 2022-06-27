import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '..';
import Book from '../entity/Book';
import Genre from '../entity/Genre';
import constants from '../../utils/constants';

const generateBooks = async () => {
  try {
    const array = new Array(constants.BOOKS_QUANTITY_TO_CREATE).fill(1);
    const genres = await db.genre.find();
    if (genres.length === 0) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Genre getting error');
    }

    for await (const _ of array) {
      const genreId = genres[Math.floor(Math.random() * genres.length)].genreId;

      const book = new Book();
      book.title = faker.lorem.words();
      book.author = faker.name.lastName();
      book.cover = faker.image.imageUrl();
      book.price = faker.datatype.number({ min: 1, max: 100 });
      book.inStock = faker.datatype.number(100);
      book.dateOfIssue = faker.date.birthdate();
      book.averageRate = faker.datatype.number({ min: 1, max: 5 });
      book.description = faker.lorem.text();
      book.genres = [{ genreId } as Genre];
      const result = await db.book.save(book);
      if (!result) {
        throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Book creation error');
      }
    }
  } catch (error) {
    console.log('Book generation error');
  }
};

export default generateBooks;
