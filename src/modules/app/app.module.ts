import { Module } from '@nestjs/common';
import { AppService } from '../../svc/app.service';
import { OrdersService } from '../../svc/orders.service';
import { RedisManager } from '../../svc/tools/redis';
import { OrdersModule } from '../orders/orders.module';
import { AppController } from './app.controller';

@Module({
  imports: [OrdersModule],
  controllers: [AppController],
  providers: [AppService, OrdersService, RedisManager],
})
export class AppModule {
  constructor() {
    console.log('[Module] App created');
  }
}
