import { Post } from 'src/post/entity/post.entity';
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
}
