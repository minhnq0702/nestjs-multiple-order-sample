import { OrdersModule } from '@module/orders/orders.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from '@svc/app.service';
import { AppController } from './app.controller';

@Module({
  imports: [OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {
    console.log('[Module] App created');
  }

  configure(consumer: MiddlewareConsumer) {
    // Middleware configuration goes here
    console.log(`Middleware configuration ${consumer}}`);
    // consumer.apply(SampleMiddleware).forRoutes('*');
  }
}
