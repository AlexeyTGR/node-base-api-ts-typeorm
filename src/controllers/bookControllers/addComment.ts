import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';
import Comment from '../../db/entity/Comment';

type ReqBody = {
  bookId: number,
  text: string,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const addComment: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const book = await db.book.findOne({
      relations: { comments: true },
      where: { bookId: req.body.bookId },
    });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'No such book exists');
    }

    const user = req.user;

    const comment = new Comment();
    comment.book = book;
    comment.user = user;
    comment.text = req.body.text;
    comment.date = new Date();

    const data = await db.comment.save(comment);
    if (!data) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    next(err);
  }
};

export default addComment;
