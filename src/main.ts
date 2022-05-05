import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {JwtGuard} from "./common/guards/jwt.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
      .setTitle('Dry cleaning')
      .setDescription('Dry cleaning API description')
      .setVersion('1.0')
      .addTag('dry cleaning')
      .addBearerAuth(
          { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT', in: 'header' },
          'access-token'
      )
      .addBearerAuth(
          { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT', in: 'header' },
          'refresh-token'
      )
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
