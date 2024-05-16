import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SampleMiddleware } from '@svc/middleware/sample';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  app.use(new SampleMiddleware().use);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
  console.log(
    `Application is running on: ${await app.getUrl()} - ${process.pid}`,
  );
}
bootstrap();
