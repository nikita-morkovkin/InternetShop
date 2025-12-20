import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Get('by-store-id/:storeId')
  async getReviewByStoreId(@Param('storeId') storeId: string) {
    return this.reviewService.getReviewByStoreId(storeId);
  }

  @Auth()
  @Post(':productId/:storeId')
  @HttpCode(200)
  async createReview(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createReview(dto, userId, productId, storeId);
  }

  @Auth()
  @Delete(':id')
  async deleteReview(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.reviewService.deleteReview(id, userId);
  }
}
