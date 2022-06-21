import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

export const getUserFavorites: Handler = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      relations: {
        favorites: true,
      },
      where: {
        id: +req.user.id,
      },
    });

    const userFavorites = user.favorites.map((book) => {
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
