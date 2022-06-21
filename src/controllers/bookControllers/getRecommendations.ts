import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';

export const getRecommendations: Handler = async (req, res, next) => {
  try {
    const searchParams = {
      relations: {
        ratings: true,
        users: false,
      },
      skip: 0,
      take: 4,
    };

    if (req.user) {
      searchParams.relations.users = true;
    }
    const books = await db.book.find(searchParams);

    if (books.length === 0) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    const recommendedBooks = books.map((book) => {
      const formattedBook = { ...book };
      if (formattedBook.users.length > 0) {
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
