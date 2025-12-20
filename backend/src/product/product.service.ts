import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.getSearchTermFilter(searchTerm);
    }

    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: true,
      },
    });

    return products;
  }

  private getSearchTermFilter(searchTerm: string) {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  async getProductByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        categories: true,
        colors: true,
      },
    });
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        colors: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Товар не был найден');
    }

    return product;
  }

  async getByCategory(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category || !category.productId) {
      throw new NotFoundException(
        'Категория не найдена или не связана с товаром',
      );
    }

    const products = await this.prisma.product.findMany({
      where: {
        id: category.productId,
      },
      include: {
        categories: true,
      },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Товары не найдены');
    }

    return products;
  }

  async getMostPopularProducts() {
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const productIds = mostPopularProducts
      .map((item) => item.productId)
      .filter((id): id is string => id !== null);
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        categories: true,
      },
    });

    return products;
  }

  async getSimilarProducts(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) {
      throw new NotFoundException('Товар не был найден');
    }

    const categoryTitles = currentProduct.categories.map(
      (category) => category.title,
    );

    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            title: {
              in: categoryTitles,
            },
          },
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: true,
      },
    });

    return products;
  }

  async create(storeId: string, dto: ProductDto) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Магазин не найден');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    const color = await this.prisma.color.findUnique({
      where: { id: dto.colorId },
    });

    if (!color) {
      throw new NotFoundException('Цвет не найден');
    }

    return this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        images: dto.images,
        price: dto.price,
        storeId,
        categories: {
          connect: { id: dto.categoryId },
        },
        colors: {
          connect: { id: dto.colorId },
        },
      },
    });
  }

  async update(id: string, dto: ProductDto) {
    await this.getById(id);

    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    const color = await this.prisma.color.findUnique({
      where: { id: dto.colorId },
    });

    if (!color) {
      throw new NotFoundException('Цвет не найден');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        images: dto.images,
        price: dto.price,
        categories: {
          set: [{ id: dto.categoryId }],
        },
        colors: {
          set: [{ id: dto.colorId }],
        },
      },
    });
  }

  async delete(colorId: string) {
    await this.getById(colorId);

    return this.prisma.product.delete({
      where: {
        id: colorId,
      },
    });
  }
}
