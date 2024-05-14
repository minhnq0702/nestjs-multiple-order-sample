import { NestFactory } from '@nestjs/core';
import { SampleMiddleware } from '@svc/middleware/sample';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  app.use(new SampleMiddleware().use);

  await app.listen(3000);
}
bootstrap();
