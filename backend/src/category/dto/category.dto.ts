import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString({
    message: 'Поле название является строкой',
  })
  title: string;

  @IsNotEmpty()
  @IsString({
    message: 'Поле описания должно быть строкой',
  })
  description: string;
}
