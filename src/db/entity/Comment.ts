import * as typeorm from 'typeorm';
import Book from './Book';
import User from './User';

@typeorm.Entity()
class Comment {
  @typeorm.PrimaryGeneratedColumn()
  comment_id: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
  })
  date: number;

  @typeorm.Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @typeorm.ManyToOne(() => User, (user) => user.comments)
  @typeorm.JoinColumn()
  user: User;

  @typeorm.ManyToOne(() => Book, (book) => book.comments)
  @typeorm.JoinColumn()
  book: Book;
}

export default Comment;
