import { Module } from '@nestjs/common';
import { AppController, OrdersController } from '../controllers/app.controller';
import { AppService } from '../svc/app.service';
import { RedisManager } from '../tools/redis';

@Module({
  imports: [],
  controllers: [AppController, OrdersController],
  providers: [AppService, RedisManager],
})
export class AppModule {}
