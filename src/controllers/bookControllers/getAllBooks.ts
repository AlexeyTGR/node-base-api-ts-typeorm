import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

export const getAllBooks: Handler = async (req, res, next) => {
  try {
    const books = await db.book.find();

    return res.status(StatusCodes.OK).json({ books });
  } catch (err) {
    next(err);
  }
};

export default getAllBooks;
