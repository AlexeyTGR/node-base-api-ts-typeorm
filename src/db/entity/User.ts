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

  @Column('text')
  name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column('date')
  dob: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await passwordUtils.hash(this.password);
  }
}

export default User;
