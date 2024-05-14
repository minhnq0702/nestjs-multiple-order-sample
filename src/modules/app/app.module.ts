import { OrdersModule } from '@module/orders/orders.module';
import { Module } from '@nestjs/common';
import { AppService } from '@svc/app.service';
import { AppController } from './app.controller';

@Module({
  imports: [OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('[Module] App created');
  }
}
