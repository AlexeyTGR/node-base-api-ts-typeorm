import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import Genre from './Genre';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column({
    nullable: true,
  })
  price: number;

  @Column()
  dateOfIssue: Date;

  @Column({
    nullable: true,
  })
  quantity: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];
}

export default Book;
