import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILike, Like } from 'typeorm';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqQuery = {
  value?: string;
}

type ExtendedRequest = Request<unknown, unknown, unknown, ReqQuery>

export const searchForValue: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const searchValue = req.query.value;
    if (!searchValue) {
      res.status(StatusCodes.OK);
    }

    const data = await db.book.findBy({
      title: ILike(`%${searchValue}%`),
    });

    res.status(StatusCodes.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

export default searchForValue;
