import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import constants from '../../utils/constants';

const getAllGenres: Handler = async (req, res, next) => {
  try {
    const genres = await db.genre.find();
    if (genres.length === 0) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    return res.status(StatusCodes.OK).json({ genres });
  } catch (err) {
    next(err);
  }
};

export default getAllGenres;
