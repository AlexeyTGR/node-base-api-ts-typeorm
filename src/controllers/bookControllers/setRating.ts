import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';
import Rating from '../../db/entity/Rating';
import calcAverageRate from '../../utils/calcAverageRate';

type ReqBody = {
  bookId: number;
  rating: number;
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

const updateBookAverageRating = async (id: number) => {
  const updatedBook = await db.book.findOne({
    relations: { ratings: true },
    where: { bookId: id },
  });
  if (!updatedBook) {
    throw createCustomError(StatusCodes.NOT_FOUND, 'No such book exists');
  }
  const averageRate = calcAverageRate(updatedBook.ratings);
  updatedBook.averageRate = averageRate;

  const updateAverageRate = await db.book.update(updatedBook.bookId, { averageRate });
  if (!updateAverageRate) {
    throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
  }
};

export const setRating: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const rate = new Rating();
    const user = req.user;
    const book = await db.book.findOne({
      relations: { ratings: true },
      where: { bookId: req.body.bookId },
    });

    const currentRatingFromUser = await db.rating.findOne({
      relations: {
        book: { ratings: true },
        user: { ratings: true },
      },
      where: {
        user: { id: user.id },
        book: { bookId: book.bookId },
      },
    });
    if (currentRatingFromUser) {
      rate.rating = req.body.rating;
      await db.rating.update(currentRatingFromUser.rating_id, rate);
    } else {
      rate.rating = req.body.rating;
      rate.user = user;
      rate.book = book;
      await db.rating.save(rate);
    }

    await updateBookAverageRating(book.bookId);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default setRating;
