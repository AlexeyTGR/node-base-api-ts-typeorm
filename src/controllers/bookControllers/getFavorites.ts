import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Book from 'src/db/entity/Book';

export const getUserFavorites: Handler = async (req, res, next) => {
  try {
    const user = req.user;

    const userFavorites = user.favorites.map((book: Book) => {
      const formattedBook = { ...book };
      formattedBook.isInFavorite = true;
      return formattedBook;
    });

    return res.status(StatusCodes.OK).json(userFavorites);
  } catch (err) {
    next(err);
  }
};

export default getUserFavorites;
