import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindOneOptions } from 'typeorm';
import Book from '../../db/entity/Book';

import db from '../../db';
import createCustomError from '../../utils/createCustomError';

export const getOneBook: Handler = async (req, res, next) => {
  try {
    const bookId = +req.params.id;
    const searchParams: FindOneOptions<Book> = {
      relations: {
        ratings: true,
        comments: { user: true },
        users: Boolean(req.user),
      },
      where: { bookId },
      order: { comments: { commentId: 'ASC' } },
    };

    const book = await db.book.findOne(searchParams);

    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'Book not found');
    }

    if (req.user) {
      const isInUserFavorites = book.users.findIndex((user) => {
        return user.id === +req.user.id;
      });
      book.isInFavorite = isInUserFavorites > -1;
      delete book.users;
    }

    return res.status(StatusCodes.OK).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getOneBook;
