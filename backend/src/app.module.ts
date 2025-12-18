import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { YandexStrategy } from './auth/strategies/yandex.strategy';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ColorModule,
    CategoryModule,
    FileModule,
    StoreModule,
    OrderModule,
    StatisticsModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    GoogleStrategy,
    YandexStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
