import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReview(
    memberId: number,
    teacherId: number,
    rating: number,
    content: string,
  ) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const review = this.reviewRepository.create({
      member: { id: memberId },
      teacher: { id: teacherId },
      rating,
      content,
    });
    return await this.reviewRepository.save(review);
  }

  async getTeacherReviews(teacherId: number) {
    const reviews = await this.reviewRepository.find({
      where: { teacher: { id: teacherId } },
      order: { createdAt: 'DESC' },
    });

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length || 0;

    return {
      reviews,
      averageRating: parseFloat(averageRating.toFixed(2)),
    };
  }
}
