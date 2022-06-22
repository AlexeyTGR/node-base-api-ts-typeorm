import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';
import Comment from '../../db/entity/Comment';

type ReqBody = {
  book_id: number,
  user_id: number,
  text: string,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const addComment: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const book = await db.book.findOne({
      relations: { comments: true },
      where: { bookId: req.body.book_id },
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

    const newComment = await db.comment.save(comment);
    if (!newComment) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    return res.status(StatusCodes.OK).json({ newComment });
  } catch (err) {
    next(err);
  }
};

export default addComment;
