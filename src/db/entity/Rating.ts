import * as typeorm from 'typeorm';

@typeorm.Entity()
class Rating {
  @typeorm.PrimaryGeneratedColumn()
  rating_id: number;

  @typeorm.Column({
    type: 'int2',
    nullable: false,
    default: 0,
  })
  rating: number;
}

export default Rating;
