import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import User from './User';
import Movie from '@modules/movies/infra/typeorm/entities/Movie';

@Entity('user_movie')
export default class UserMovie {
  @PrimaryColumn()
  @ManyToMany(() => User, user => user.id)
  @JoinTable({
    name: 'users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'id',
      referencedColumnName: 'id',
    },
  })
  user_id: string;

  @PrimaryColumn()
  @ManyToMany(() => Movie, movie => movie.id)
  @JoinTable({
    name: 'movies',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'movie_id',
    },
    inverseJoinColumn: {
      name: 'id',
      referencedColumnName: 'id',
    },
  })
  movie_id: string;

  @Column({ nullable: true })
  vote: number;
}
