import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { OrderController } from '../controllers/order.controller';
import { AppService } from '../svc/app.service';
import { OrderService } from '../svc/order.service';
import { RedisManager } from '../tools/redis';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService, RedisManager],
})
export class AppModule {
  constructor() {
    console.log('[Module] App created');
  }
}
