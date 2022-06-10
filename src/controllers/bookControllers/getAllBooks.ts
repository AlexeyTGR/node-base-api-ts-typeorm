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
  value?: string;
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
    const searchValue = req.query.value;
    let query = db.book.createQueryBuilder('book').orderBy(`book.${order}`, orderDirection);

    query = query.andWhere('book.price BETWEEN :from AND :to', { from: priceFrom, to: priceTo });

    if (genres) {
      const genresArray = genres.split(',').map((genreId) => +genreId);
      query = query.leftJoin('book.genres', 'genre')
        .andWhere('genre.genreId IN (:...genreIds)', { genreIds: genresArray });
    }
    if (searchValue) {
      query = query.andWhere(
        '(book.title ILIKE :searchString OR book.author ILIKE :searchString OR book.description ILIKE :searchString)',
        { searchString: `%${searchValue}%` },
      );
    }

    const [data, totalCount] = await query.take(limit).skip(skip).getManyAndCount();

    return res.status(StatusCodes.OK).json({ books: data, pagesQuantity: totalCount });
  } catch (err) {
    next(err);
  }
};

export default getAllBooks;
