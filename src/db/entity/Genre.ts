import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Genre {
  @PrimaryGeneratedColumn()
  genreId: number;

  @Column('text')
  name: string;
}

export default Genre;
