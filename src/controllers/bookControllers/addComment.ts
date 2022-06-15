import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import Comment from '../../db/entity/Comment';

type ReqBody = {
  book_id: string,
  user_id: string,
  text: string,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const addComment: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const book = await db.book.findOne({
      relations: { comments: true },
      where: { bookId: +req.body.book_id },
    });
    const user = await db.user.findOne({
      relations: { comments: true },
      where: { id: +req.body.user_id },
    });
    const comment = new Comment();
    comment.book = book;
    comment.user = user;
    comment.text = req.body.text;
    comment.date = new Date();

    await db.comment.save(comment);
    comment.comment_id = Math.random();

    return res.status(StatusCodes.OK).json({ comment });
  } catch (err) {
    next(err);
  }
};

export default addComment;
