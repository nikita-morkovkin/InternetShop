import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReviewByStoreId(storeId: string) {
    return this.prisma.review.findMany({
      where: {
        storeId,
      },
      include: {
        user: true,
      },
    });
  }

  async getById(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!review) {
      throw new NotFoundException(
        'Отзыв не был найден или вы не являетесь его владельцем',
      );
    }

    return review;
  }

  async createReview(
    dto: ReviewDto,
    userId: string,
    productId: string,
    storeId: string,
  ) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    });
  }

  async deleteReview(id: string, userId: string) {
    await this.getById(id, userId);

    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
