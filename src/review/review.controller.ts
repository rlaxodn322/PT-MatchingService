import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-review')
  async createReview(
    @Body('memberId') memberId: number,
    @Body('teacherId') teacherId: number,
    @Body('rating') rating: number,
    @Body('content') content: string,
  ) {
    return this.reviewService.createReview(
      memberId,
      teacherId,
      rating,
      content,
    );
  }
}
