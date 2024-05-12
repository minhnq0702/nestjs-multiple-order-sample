import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './svc/app.service';
import { RedisManager } from './tools/model_redids';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('/orders')
export class OrdersController {
  constructor(private readonly redisClient: RedisManager) {}
  @Get()
  getOrders(): object {
    return {
      status: 200,
      body: 'This is order api',
    };
  }

  @Post()
  async createOrder(@Req() req: Request): Promise<object> {
    console.log(req.body);
    const KEY = 'iPhone15';
    const count = this.redisClient.get(KEY);
    if (!count) {
      this.redisClient.set(KEY, 0);
    }

    const val = await this.redisClient.incrBy('iPhone15', 1);
    console.log('haha', val);
    return {
      status: 201,
      body: `Order created ${val}`,
    };
  }
}

// curl with post request
// curl -X POST http://localhost:3000/orders -H 'Content-Type: application/json' -d '{"name": "order"}'
