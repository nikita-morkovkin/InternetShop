import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString({ message: 'Название продукта должно быть строкой' })
  @IsNotEmpty({
    message: 'Название продукта не должно быть пустым',
  })
  title: string;

  @IsString({ message: 'Описание продукта должно быть строкой' })
  @IsNotEmpty({
    message: 'Описание продукта не должно быть пустым',
  })
  description: string;

  @IsString({
    message: 'Нужно указать хотя бы одну картинку',
    each: true,
  })
  @ArrayMinSize(1, {
    message: 'Должна быть хотя бы одна картинка',
  })
  @IsNotEmpty({
    each: true,
    message: 'Путь к картинке',
  })
  images: string[];

  @IsNotEmpty({
    message: 'Цена не должна быть пустой',
  })
  @IsNumber()
  price: number;

  @IsNotEmpty({
    message: 'Идентификатор (ID) категории не должен быть пуст',
  })
  @IsString({
    message: 'Идентификатор (ID) категории должен быть строкой',
  })
  categoryId: string;

  @IsString({
    message: 'Идентификатор (ID) цвета не должен быть пуст',
  })
  @IsNotEmpty({
    message: 'Идентификатор (ID) цвета не должен быть пуст',
  })
  colorId: string;
}
