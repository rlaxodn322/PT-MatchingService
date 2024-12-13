import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // src/uploads 경로가 아닌 dist 
      serveRoot: '/uploads', // 외부에서 접근할 경로
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
    }),
 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // MySQL 드라이버 사용
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    AuthModule,
    UserModule,

    // PostModule,
    // CommentModule,
    // NotificationModule,
    // WorkoutRecordModule,
    // ProductModule,
    // HealthNewsModule,
    // ChatModule,
    // CrawlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
