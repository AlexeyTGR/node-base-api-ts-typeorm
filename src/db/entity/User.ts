import * as typeorm from 'typeorm';
import createImagesURL from '../../utils/createImagesURL';
import passwordUtils from '../../utils/passwordUtils';
import Book from './Book';
import Comment from './Comment';
import Rating from './Rating';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@typeorm.Entity()
class User {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @typeorm.Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name: string;

  @typeorm.Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @typeorm.Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @typeorm.Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar: string;

  @typeorm.BeforeInsert()
  hashPassword() {
    this.password = passwordUtils.hash(this.password);
  }

  @typeorm.AfterLoad()
  createImagesURL() {
    this.avatar = createImagesURL(this.avatar, 'user');
  }

  @typeorm.OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @typeorm.OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @typeorm.ManyToMany(() => Book, (book) => book.users)
  favorites: Book[];
}

export default User;
