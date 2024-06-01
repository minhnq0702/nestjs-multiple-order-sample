import { LoggerModule } from '@module/logger/logger.module';
import { Module } from '@nestjs/common';
import { OrdersService } from '@src/modules/orders/orders.service';
import { RedisManagerType, getRedisManager } from '@svc/tools/redis';
import { OrdersController } from './orders.controller';

@Module({
  imports: [LoggerModule.register('OrderModule')],
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
