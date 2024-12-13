import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  //app.enableCors(); // CORS를 활성화
  app.enableCors({
    origin: 'http://localhost:3000', // 클라이언트 주소
    credentials: true, // credentials 포함 허용
  });
  const config = new DocumentBuilder()
    .setTitle('Project NestJS API')
    .setDescription('NestJS API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .addSecurityRequirements('bearer') // Authorizations 입력.
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      security: [{ 'access-token': [] }],
    },
  });
  // SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
