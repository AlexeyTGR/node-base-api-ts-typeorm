import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

export const getAllBooks: Handler = async (req, res, next) => {
  console.log('1111111111111111111111111111111111111111');
  try {
    const books = await db.book.find();
    console.log('books', books);

    return res.status(StatusCodes.OK).json({ books });
  } catch (err) {
    next(err);
  }
};

export default getAllBooks;
