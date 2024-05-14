import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisManager {
  private static instance: RedisManager;
  private client: RedisClientType;

  constructor() {
    console.log('[Tools] RedisManager constructor');
    if (!RedisManager.instance) {
      console.log('[Tools] RedisManager created');
      this.client = createClient();
      this.client.on('error', (error) => {
        console.error('Redis error:', error);
      });
      this.client.connect();
      RedisManager.instance = this;
    }
    return RedisManager.instance;
  }

  public async set(key: string, value: string | number): Promise<string> {
    const res = await this.client.set(key, value);
    return res;
  }

  public async get(key: string): Promise<string | null> {
    const res = await this.client.get(key);
    return res;
  }

  public async delete(key: string): Promise<number> {
    const res = await this.client.del(key);
    return res;
  }

  public async setnx(key: string, value: string): Promise<boolean> {
    const res = await this.client.setNX(key, value);
    return res;
  }

  public async incrBy(key: string, value: number): Promise<number> {
    const res = await this.client.incrBy(key, value);
    return res;
  }
}