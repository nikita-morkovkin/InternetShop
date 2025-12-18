import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Get('by-store-id/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.categoryService.getCategoryByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Auth()
  @HttpCode(200)
  @Post(':storeId')
  async createCategory(
    @Param('storeId') storeId: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.createCategory(storeId, dto);
  }

  @Auth()
  @HttpCode(200)
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
