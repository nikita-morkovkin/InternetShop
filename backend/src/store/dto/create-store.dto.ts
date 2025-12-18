import { IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString({ message: 'Название для магазина обязательно' })
  title: string;
}
