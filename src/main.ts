import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SampleMiddleware } from '@svc/middleware/sample';
import { AppModule } from './app.module';
import { MyValidationPipeOptions } from './dto/_validator';
import AllExceptionFilter from './svc/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * define global prefix
  app.setGlobalPrefix('/api');

  // use global validation pipe
  app.useGlobalPipes(new ValidationPipe(new MyValidationPipeOptions()));

  const adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(adapter));

  // global middleware
  app.use(new SampleMiddleware().use);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
  console.log(`Application is running on: ${await app.getUrl()} - ${process.pid}`);
}
bootstrap();
