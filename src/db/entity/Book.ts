import * as typeorm from 'typeorm';
import Genre from './Genre';
import createImagesURL from '../../utils/createImagesURL';
import Rating from './Rating';
import Comment from './Comment';
import User from './User';

@typeorm.Entity()
class Book {
  @typeorm.PrimaryGeneratedColumn()
  bookId: number;

  @typeorm.Column({
    type: 'varchar',
    nullable: false,
    default: 'anonimous',
  })
  title: string;

  @typeorm.Column({
    type: 'varchar',
    nullable: false,
  })
  author: string;

  @typeorm.Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @typeorm.Column({
    type: 'varchar',
    nullable: true,
  })
  cover: string;

  @typeorm.Column()
  dateOfIssue: Date;

  @typeorm.Column({
    type: 'int',
    nullable: true,
  })
  inStock: number;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @typeorm.Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    default: 0,
    nullable: true,
  })
  averageRate: number;

  isInFavorite: boolean;

  @typeorm.AfterLoad()
  setinitialIsInFavoritesValue() {
    this.isInFavorite = false;
  }

  @typeorm.AfterLoad()
  createImagesURL() {
    this.cover = createImagesURL(this.cover, 'book');
  }

  @typeorm.ManyToMany(() => Genre, (genre) => genre.genreId)
  @typeorm.JoinTable()
  genres: Genre[];

  @typeorm.OneToMany(() => Rating, (rating) => rating.book)
  ratings: Rating[];

  @typeorm.OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];

  @typeorm.ManyToMany(() => User, (user) => user.favorites)
  @typeorm.JoinTable()
  users: User[];
}

export default Book;
