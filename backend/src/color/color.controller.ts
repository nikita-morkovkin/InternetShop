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
import { ColorService } from './color.service';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Auth()
  @Get('by-store-id/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.colorService.getColorByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.colorService.getById(id);
  }

  @Auth()
  @HttpCode(200)
  @Post(':storeId')
  async createColor(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto);
  }

  @Auth()
  @HttpCode(200)
  @Put(':id')
  async updateColor(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.colorService.update(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteColor(@Param('id') id: string) {
    return this.colorService.delete(id);
  }
}
