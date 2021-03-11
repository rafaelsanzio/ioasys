import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_movie')
export default class UserMovie {
  @Column()
  @PrimaryColumn()
  user_id: string;

  @Column()
  @PrimaryColumn()
  movie_id: string;

  @Column({ nullable: true })
  vote: number;
}
