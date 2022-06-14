import * as typeorm from 'typeorm';
import Book from './Book';
import User from './User';

@typeorm.Entity()
class Rating {
  @typeorm.PrimaryGeneratedColumn()
  rating_id: number;

  @typeorm.Column({
    type: 'int2',
    nullable: false,
    default: 0,
  })
  rating: number;

  @typeorm.ManyToOne(() => User, (user) => user.ratings)
  @typeorm.JoinColumn()
  user: User;

  @typeorm.ManyToOne(() => Book, (book) => book.ratings)
  @typeorm.JoinColumn()
  book: Book;
}

export default Rating;
