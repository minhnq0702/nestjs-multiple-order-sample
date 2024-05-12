import { Injectable } from '@nestjs/common';
import { RedisManager } from '../tools/redis';

const _AVAILABLE_PRODUCTS: number = 10;

@Injectable()
export class OrderService {
  constructor(private readonly redisClient: RedisManager) {}

  async createOrder(productKey: string): Promise<string> {
    const sold = await this.redisClient.get(productKey);
    if (!sold) {
      await this.redisClient.set(productKey, 0);
    }

    const _sold: number = parseInt(sold, 10);
    if (_sold >= _AVAILABLE_PRODUCTS) {
      throw new Error('Sold out');
    }

    await this.redisClient.incrBy(productKey, 1);

    return `Order ${productKey} created`;
  }
}
