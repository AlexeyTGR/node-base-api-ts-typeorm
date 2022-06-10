import * as typeorm from 'typeorm';
import Genre from './Genre';
import createImagesURL from '../../utils/createImagesURL';
import Rating from './Rating';

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

  @typeorm.AfterLoad()
  createImagesURL() {
    this.cover = createImagesURL(this.cover, 'book');
  }

  @typeorm.ManyToMany(() => Genre, (genre) => genre.genreId)
  @typeorm.JoinTable()
  genres: Genre[];
}

export default Book;
