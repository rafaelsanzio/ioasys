import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import User from './User';

@Entity('user_movie')
export default class UserMovie {
  @PrimaryColumn()
  @ManyToMany(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @PrimaryColumn()
  @ManyToMany(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  movie_id: string;

  @Column({ nullable: true })
  vote: number;
}
