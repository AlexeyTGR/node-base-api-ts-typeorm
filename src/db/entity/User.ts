import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import crypto from 'crypto';
import config from '../../config';

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

  @Column('text')
  password: string;

  @Column('date')
  dob: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log('>>>>>', this.password);

    this.password = await crypto.pbkdf2Sync(this.password, config.salt, 100, 64, 'sha512').toString('hex');
  }
}

export default User;
