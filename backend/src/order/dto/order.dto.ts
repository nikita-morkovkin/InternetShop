import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum EnumOrderStatus {
  PAID,
  CANCELLED,
  PENDING,
}

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus, {
    message:
      'Статус товара должен быть одним из: ' +
      Object.values(EnumOrderStatus).join(', '),
  })
  status: EnumOrderStatus;

  @IsArray({
    message: 'В заказе нет ни одного товара',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Количество должно быть числом' })
  quantity: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  price: number;

  @IsString({ message: 'Product Id должен быть числом' })
  @IsNotEmpty({ message: 'Product Id не может быть пустым' })
  productId: string;

  @IsString({ message: 'Store Id должен быть числом' })
  @IsNotEmpty({ message: 'Store Id не может быть пустым' })
  storeId: string;
}
