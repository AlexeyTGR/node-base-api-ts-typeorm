import * as typeorm from 'typeorm';
import Book from './Book';
import User from './User';

@typeorm.Entity()
class Comment {
  @typeorm.PrimaryGeneratedColumn({ name: 'comment_id' })
  commentId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
  })
  date: Date;

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
