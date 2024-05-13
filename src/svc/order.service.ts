import { Injectable } from '@nestjs/common';
import { RedisManager } from '../tools/redis';

const _AVAILABLE_PRODUCTS: number = 10;

@Injectable()
export class OrderService {
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
}
