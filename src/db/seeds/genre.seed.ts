import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import Genre from '../entity/Genre';
import db from '..';
import createCustomError from '../../utils/createCustomError';
import constants from '../../utils/constants';

const generateGenres = async () => {
  try {
    const array = new Array(constants.GENRES_QUANTITY_TO_CREATE).fill(1);

    for await (const _ of array) {
      const genre = new Genre();
      genre.name = faker.word.noun();
      const result = await db.genre.save(genre);
      if (!result) {
        throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Genre saving error');
      }
    }
  } catch (err) {
    console.log('Genre generation error');
  }
};

export default generateGenres;
