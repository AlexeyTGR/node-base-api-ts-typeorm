import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';

import db from '../../db';

export const getRecommendations: Handler = async (req, res, next) => {
  try {
    let query = db.book.createQueryBuilder('book')
      .leftJoinAndSelect('book.ratings', 'rating');

    if (req.user) {
      query = query.leftJoinAndSelect('book.users', 'user', 'user.id = :userId', { userId: +req.user.id })
        .leftJoinAndSelect('user.favorites', 'favorites');
    }

    const books = await query.take(4).skip(0).getMany();
    if (books.length === 0) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    const recommendedBooks = books.map((book) => {
      const formattedBook = { ...book };
      if (formattedBook.users && formattedBook.users.length > 0) {
        formattedBook.users.forEach((user) => {
          if (user.id === req.user.id) {
            formattedBook.isInFavorite = true;
          }
        });
      }
      delete formattedBook.users;
      return formattedBook;
    });

    return res.status(StatusCodes.OK).json(recommendedBooks);
  } catch (err) {
    next(err);
  }
};

export default getRecommendations;
