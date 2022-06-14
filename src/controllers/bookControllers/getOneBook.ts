import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import Rating from '../../db/entity/Rating';

export const getOneBook: Handler = async (req, res, next) => {
  try {
    const bookId = +req.params.id;
    const book = await db.book.findOne({
      relations: { ratings: true },
      where: { bookId },
    });
    // const rating = await db.rating.find({ where: { book_id: bookId } });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'Book not found');
    }

    return res.status(StatusCodes.OK).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getOneBook;
