import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Review } from './entity/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
