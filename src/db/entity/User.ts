import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, AfterLoad, OneToMany } from 'typeorm';
import createImagesURL from '../../utils/createImagesURL';
import passwordUtils from '../../utils/passwordUtils';
import Rating from './Rating';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'text',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatar: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await passwordUtils.hash(this.password);
  }

  @AfterLoad()
  createImagesURL() {
    this.avatar = createImagesURL(this.avatar, 'user');
  }

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}

export default User;
