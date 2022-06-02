import * as typeorm from 'typeorm';
import Book from './Book';

@typeorm.Entity()
class Genre {
  @typeorm.PrimaryGeneratedColumn()
  genreId: number;

  @typeorm.Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  name: string;

  @typeorm.ManyToMany(() => Book, (book) => book.bookId)
  books: Book[];
}

export default Genre;
