import { setSeederFactory } from 'typeorm-extension';
import Book from '../entity/Book';
import Genre from '../entity/Genre';

setSeederFactory(Book, (faker) => {
  const book = new Book();
  book.title = faker.lorem.words();
  book.author = faker.name.lastName();
  book.cover = faker.image.imageUrl();
  book.price = faker.datatype.number({ min: 1, max: 100 });
  book.inStock = faker.datatype.number(100);
  book.dateOfIssue = faker.date.birthdate();
  book.averageRate = faker.datatype.number({ min: 1, max: 5 });
  book.genres = [{ genreId: 11 } as Genre];
  book.description = faker.lorem.text();
  return book;
});

export default setSeederFactory;
