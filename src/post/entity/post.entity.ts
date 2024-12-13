import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-array', { nullable: true })
  specs: string[];

  @Column('simple-array', { nullable: true })
  photos: string[];

  @Column('simple-array', { nullable: true })
  awards: string[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
