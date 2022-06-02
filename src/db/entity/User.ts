import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import passwordUtils from '../../utils/passwordUtils';

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
}

export default User;
