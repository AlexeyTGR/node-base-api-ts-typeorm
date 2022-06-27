import generateGenres from './genre.seed';
import generateBooks from './book.seed';
import appDataSource from '../data-source';

(async () => {
  try {
    console.log(
      `10 genres and 10 books will be created by default,
       to change the quantity, change the value of the constants GENRES_QUANTITY and BOOKS_QUANTITY`,
    );
    await appDataSource.initialize();

    await generateGenres();
    await generateBooks();

    await appDataSource.destroy();
  } catch (error) {
    console.log('Sorry, random data generation went wrong');
  }
})();
