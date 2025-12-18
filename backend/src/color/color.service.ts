import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prismaService: PrismaService) {}

  async getColorByStoreId(storeId: string) {
    return this.prismaService.color.findMany({
      where: {
        storeId,
      },
    });
  }

  async getById(id: string) {
    const color = await this.prismaService.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException('Цвет не был найден');
    }

    return color;
  }

  async create(storeId: string, dto: ColorDto) {
    // Validate that the store exists
    const store = await this.prismaService.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Магазин не найден');
    }

    return this.prismaService.color.create({
      data: {
        name: dto.name,
        value: dto.value,
        storeId,
      },
    });
  }

  async update(id: string, dto: ColorDto) {
    await this.getById(id);

    return this.prismaService.color.update({
      where: { id },
      data: { ...dto },
    });
  }

  async delete(colorId: string) {
    await this.getById(colorId);

    return this.prismaService.color.delete({
      where: {
        id: colorId,
      },
    });
  }
}
