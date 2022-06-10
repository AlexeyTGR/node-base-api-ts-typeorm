import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../../db/entity/Rating';
import db from '../../db';

type ReqBody = {
  book_id: string;
  rating: string;
  user_id: string;
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const setRating: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const rate = new Rating();
    const user = await db.user.findOne({
      where: {
        id: +req.body.user_id,
      },
    });

    rate.book_id = +req.body.book_id;
    rate.rating = +req.body.rating;
    rate.user = user;

    await db.rating.save(rate);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default setRating;
