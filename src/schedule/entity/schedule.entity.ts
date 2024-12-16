import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: false })
  isBooked: boolean;

  @ManyToOne(() => User, (user) => user.id)
  teacher: User;

  @OneToMany(() => Application, (application) => application.schedule)
  application: Application[];
}
