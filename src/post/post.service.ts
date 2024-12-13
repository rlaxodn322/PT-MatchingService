import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createPost(userId: number, postDto: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user.role !== 'pt') {
      throw new Error('Only PT Teachers');
    }
    const post = this.postRepository.create({ ...postDto, author: user });
    return await this.postRepository.save(post);
  }
  async getPosts() {
    return await this.postRepository.find({ relations: ['author'] });
  }

  async getPostById(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('You can only delete your own posts.');
    }
    await this.postRepository.delete(postId);
    return { message: 'Post deleted successfully' };
  }
}
