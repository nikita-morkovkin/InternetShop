import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(32, { message: 'Пароль должен быть не более 32 символов' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  name: string;
}
