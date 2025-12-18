import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getCategoryByStoreId(storeId: string) {
    return this.prismaService.category.findMany({
      where: {
        storeId,
      },
    });
  }

  async getById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Категория не была найдена');
    }

    return category;
  }

  async createCategory(storeId: string, dto: CategoryDto) {
    const store = await this.prismaService.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Магазин не найден');
    }

    return this.prismaService.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        storeId,
      },
    });
  }

  async updateCategory(id: string, dto: CategoryDto) {
    await this.getById(id);

    return this.prismaService.category.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteCategory(categoryId: string) {
    await this.getById(categoryId);

    return this.prismaService.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
