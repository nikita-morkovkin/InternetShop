import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth.register.dto';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(dto: AuthLoginDto) {
    const user = await this.validateUser(dto);
    // @ts-ignore
    const tokens = this.generateTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthRegisterDto) {
    const isUserExists = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isUserExists) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const user = await this.userService.create(dto);
    const tokens = this.generateTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async createNewToken(refreshToken: string) {
    const result = this.jwtService.verify(refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.getById(result.sub);

    // @ts-ignore
    const tokens = this.generateTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  generateTokens(userId: string) {
    const data = { sub: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthLoginDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user)
      throw new NotFoundException('Пользователь с таким email не найден');

    if (!user.password) {
      throw new UnauthorizedException(
        'Аккаунт создан через OAuth, используйте соответствующий вход',
      );
    }

    const isValidPassword = await verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return user;
  }

  async validateOAuthLogin(req: any) {
    // @ts-ignore
    let user = await this.userService.getByEmail((req.user as any).email);

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          // @ts-ignore
          email: req.user.email,
          // @ts-ignore
          name: req.user.name,
          // @ts-ignore
          avatar: req.user.avatar,
        },
        include: {
          stores: true,
          favorites: true,
          orders: true,
        },
      });
    }

    const tokens = this.generateTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get<string>('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get<string>('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
