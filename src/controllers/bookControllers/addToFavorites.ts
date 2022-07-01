import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqBody = {
  bookId: number,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const addToFavorites: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const user = req.user;

    const book = await db.book.findOne({
      where: { bookId: req.body.bookId },
    });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'Book with this ID not found');
    }

    user.favorites.push(book);
    const result = await db.user.save(user);

    if (!result) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export default addToFavorites;
