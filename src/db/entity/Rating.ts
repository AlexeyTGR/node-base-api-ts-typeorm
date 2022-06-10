import * as typeorm from 'typeorm';
import User from './User';

@typeorm.Entity()
class Rating {
  @typeorm.PrimaryGeneratedColumn()
  rating_id: number;

  @typeorm.Column({
    type: 'int',
    nullable: false,
  })
  book_id: number;

  @typeorm.Column({
    type: 'int2',
    nullable: false,
    default: 0,
  })
  rating: number;

  @typeorm.ManyToOne(() => User, (user) => user.ratings)
  @typeorm.JoinColumn()
  user: User;
}

export default Rating;
