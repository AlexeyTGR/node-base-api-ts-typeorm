import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../../db/entity/Rating';
import db from '../../db';
import calcAverageRate from '../../utils/calcAverageRate';

type ReqBody = {
  book_id: string;
  rating: string;
  user_id: string;
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const setRating: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const updateBookAverageRating = async (id) => {
      const updatedBook = await db.book.findOne({
        relations: { ratings: true },
        where: { bookId: id },
      });
      const averageRate = calcAverageRate(updatedBook.ratings);
      updatedBook.averageRate = averageRate;

      await db.book.update(updatedBook.bookId, { averageRate });
    };

    const rate = new Rating();
    const user = await db.user.findOne({
      where: { id: +req.body.user_id },
    });
    const book = await db.book.findOne({
      relations: { ratings: true },
      where: { bookId: +req.body.book_id },
    });

    const currentRatingFromUser = await db.rating.find({
      relations: {
        book: { ratings: true },
        user: { ratings: true },
      },
      where: {
        user: { id: user.id },
        book: { bookId: book.bookId },
      },
    });
    if (currentRatingFromUser.length !== 0) {
      rate.rating = +req.body.rating;
      await db.rating.update(currentRatingFromUser[0].rating_id, rate);
      await updateBookAverageRating(book.bookId);

      return res.sendStatus(StatusCodes.OK);
    }

    rate.rating = +req.body.rating;
    rate.user = user;
    rate.book = book;

    await db.rating.save(rate);
    await updateBookAverageRating(book.bookId);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default setRating;
