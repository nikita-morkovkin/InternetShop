import { IsString } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Имя для цвета обязательно',
  })
  name: string;

  @IsString({
    message: 'Значение для цвета обязательно',
  })
  value: string;
}
