import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import constants from '../../utils/constants';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';

export const getRecommendations: Handler = async (req, res, next) => {
  try {
    const recommendedBooks = await db.book.find({
      relations: {
        ratings: true,
      },
      skip: 0,
      take: 4,
    });

    if (!recommendedBooks) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    return res.status(StatusCodes.OK).json(recommendedBooks);
  } catch (err) {
    next(err);
  }
};

export default getRecommendations;
