import { setSeederFactory } from 'typeorm-extension';
import Genre from '../entity/Genre';

setSeederFactory(Genre, (faker) => {
  const genre = new Genre();
  genre.name = faker.word.noun();
  return genre;
});

export default setSeederFactory;
