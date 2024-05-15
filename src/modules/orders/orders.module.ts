import { Module } from '@nestjs/common';
import { OrdersService } from '@src/modules/orders/orders.service';
import { RedisManager } from '@svc/tools/redis';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, RedisManager],
})
export class OrdersModule {}
