import { CreateOrderDto } from '@dto/create-order.dto';
import { UpdateOrderDto } from '@dto/update-order.dto';
import { Injectable } from '@nestjs/common';
import { RedisManager } from '@svc/tools/redis';

const _AVAILABLE_PRODUCTS: number = 10;

@Injectable()
export class OrdersService {
  constructor(private readonly redisClient: RedisManager) {}

  async createOrder(productKey: string): Promise<string> {
    console.log(`[OrderSvc] Creating order for product ${productKey}`);
    const sold = await this.redisClient.get(productKey);
    if (!sold) {
      console.log(
        `[OrderSvc] Product ${productKey} not found, creating new key`,
      );
      await this.redisClient.set(productKey, '0');
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
