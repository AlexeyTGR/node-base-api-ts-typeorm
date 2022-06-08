import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import constants from '../../utils/constants';
import db from '../../db';

type ReqQuery = {
  page?: string;
  limit?: string;
  genres?: string;
  priceFrom?: string;
  priceTo?: string;
  order?: string;
  orderDir?: 'ASC' | 'DESC';
}
type ExtendedRequest = Request<unknown, unknown, unknown, ReqQuery>

export const getAllBooks: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const page = +req.query.page || constants.COMMON_PAGE_VALUE;
    const limit = +req.query.limit || constants.COMMON_TAKE_VALUE;
    const skip = limit * (page - 1) || 0;
    const order = req.query.order || 'bookId';
    const orderDirection = req.query.orderDir || constants.COMMON_ORDER_DIRECTION;
    const priceFrom = +req.query.priceFrom || 0;
    const priceTo = +req.query.priceTo || constants.COMMON_MAX_PRICE;
    const genres = req.query.genres;

    let query = db.book.createQueryBuilder('book');
    query = query
      .orderBy(`book.${order}`, orderDirection)
      .andWhere('book.price BETWEEN :from AND :to', { from: priceFrom, to: priceTo });

    if (genres) {
      const genresArray = genres.split(',').map((genre) => {
        return +genre;
      });

      query.leftJoinAndSelect('book.genres', 'genre')
        .andWhere('genre.genreId IN (:...genreIds)', { genreIds: genresArray });
    }

    const [books, count] = await query.take(limit).skip(skip).getManyAndCount();
    const pagesQuantity = new Array(Math.ceil(count / limit));

    return res.status(StatusCodes.OK).json({ books, pagesQuantity });
  } catch (err) {
    next(err);
  }
};

export default getAllBooks;
