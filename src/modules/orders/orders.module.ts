import { Module } from '@nestjs/common';
import { OrdersService } from '@src/modules/orders/orders.service';
import { RedisManagerType, getRedisManager } from '@svc/tools/redis';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: RedisManagerType,
      useClass: getRedisManager(),
    },
  ],
})
export class OrdersModule {}
