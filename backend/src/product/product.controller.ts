import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }

  @Auth()
  @Get('by-store-id/:storeId')
  async getProductByStoreId(@Param('storeId') storeId: string) {
    return this.productService.getProductByStoreId(storeId);
  }

  @Get('by-id/:id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Get('by-category-id/:categoryId')
  async getProductByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.getByCategory(categoryId);
  }

  @Get('most-popular')
  async getMostPopularProducts() {
    return this.productService.getMostPopularProducts();
  }

  @Get('similar/:id')
  async getSimilarProducts(@Param('id') id: string) {
    return this.productService.getSimilarProducts(id);
  }

  @Auth()
  @HttpCode(200)
  @Post(':storeId')
  async createProduct(
    @Param('storeId') storeId: string,
    @Body() dto: ProductDto,
  ) {
    return this.productService.create(storeId, dto);
  }

  @Auth()
  @HttpCode(200)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
