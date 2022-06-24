import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import db from '../index';
import appDataSource from '../data-source';
import Book from '../entity/Book';
import Genre from '../entity/Genre';

class BookSeeder implements Seeder {
  // eslint-disable-next-line class-methods-use-this
  public async run(
    appDataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await db.book.insert([
      {
        title: '007',
        author: 'J. Bond',
        cover: 'LotRTTT.jpeg',
        price: 50,
        inStock: 10,
        dateOfIssue: '1954-11-11',
        genres: [{ genreId: 10 } as Genre],
      },
    ]);
    const bookFactory = factoryManager.get(Book);
    await bookFactory.save();
  }
}

export default BookSeeder;
