import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export default User;
