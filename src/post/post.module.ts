import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
