import { Max, Min } from 'class-validator';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  member: User;

  @ManyToOne(() => User, (user) => user.receivedReviews, { eager: true })
  teacher: User;

  @Column('int')
  @Min(1)
  @Max(5)
  rating: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
