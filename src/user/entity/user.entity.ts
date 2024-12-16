import { application } from 'express';
import { Post } from 'src/post/entity/post.entity';
import { Application } from 'src/schedule/entity/application.entity';
import { Schedule } from 'src/schedule/entity/schedule.entity';
import { App } from 'supertest/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: String;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: false })
  role: string;
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Schedule, (schedule) => schedule.teacher)
  schedules: Schedule[];

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
