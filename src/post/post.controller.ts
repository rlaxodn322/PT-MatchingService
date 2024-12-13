import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const userId = req.user.id;
    return await this.postService.createPost(userId, createPostDto);
  }
  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }
  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return await this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    return await this.postService.deletePost(id, userId);
  }
}
