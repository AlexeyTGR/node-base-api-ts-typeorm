import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import db from '..';
import appDataSource from '../data-source';
import Book from '../entity/Book';
import Genre from '../entity/Genre';

class BookSeeder implements Seeder {
  // eslint-disable-next-line class-methods-use-this
  public async run(
    appDataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await db.book.insert([
      {
        title: 'LotR 2',
        author: 'Tolkien',
        cover: '',
        price: 100,
        inStock: 50,
        dateOfIssue: '1955-10-10',
        genres: [{ genreId: 10 } as Genre],
      },
    ]);
    // const bookFactory = await factoryManager.get(Book);
    // await bookFactory.save();
  }
}

export default BookSeeder;
