import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({
    message: 'Текст (text) должен быть строкой',
  })
  @IsNotEmpty({
    message: 'Текст (text) не должен быть пустой',
  })
  text: string;

  @IsNumber({}, { message: 'Рейтинг (rating) должен быть строкой' })
  @IsNotEmpty({
    message: 'Рейтинг (rating) не должен быть строкой',
  })
  @Min(1, { message: 'Минимальный рейтинг - 1' })
  @Max(5, { message: 'Максимальный рейтинг - 5' })
  rating: number;
}
