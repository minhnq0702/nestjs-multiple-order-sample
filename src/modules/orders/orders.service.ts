import { CreateOrderDto } from '@dto/create-order.dto';
import { UpdateOrderDto } from '@dto/update-order.dto';
import { Order, sampleOrders } from '@entities/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { RedisManagerType } from '@svc/tools/redis';

const _AVAILABLE_PRODUCTS: number = 10;

@Injectable()
export class OrdersService {
  constructor(@Inject(RedisManagerType) private readonly redisClient: RedisManagerType) {
    console.log('[Service] OrdersService instantiated');
  }

  async createOrder(productKey: string): Promise<string> {
    const sold = await this.redisClient.get(productKey);
    if (!sold) {
      console.log(`[OrderSvc] Product ${productKey} not found, creating new key`);
      await this.redisClient.setnx(productKey, '0');
    }

    // const _sold: number = parseInt(sold, 10);
    const _newSold = await this.redisClient.incrBy(productKey, 1);
    if (_newSold > _AVAILABLE_PRODUCTS) {
      throw new Error('Sold out');
    }
    return `Order ${productKey} created at quantity ${_newSold} at ${new Date().toISOString()}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll(): Order[] {
    return sampleOrders;
    // return `This action returns all orders`;
  }

  findOne(id: number): Order {
    const o = sampleOrders.find((order) => order.id === id);
    if (!o) {
      throw new Error(`Order ${id} not found`);
    }
    return o;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
