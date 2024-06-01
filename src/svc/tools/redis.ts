import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';

// adding interface for RedisManager
export interface RedisManagerType {
  set(key: string, value: string | number): Promise<string>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  setnx(key: string, value: string): Promise<boolean>;
  incrBy(key: string, value: number): Promise<number>;
  decrBy(key: string, value: number): Promise<number>;
}
export const RedisManagerType = Symbol('RedisManagerType');

@Injectable()
export class RedisManager implements RedisManagerType {
  private static instance: RedisManager;
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService) {
    if (!RedisManager.instance) {
      this.client = createClient({
        url: this.configService.get('REDIS_URL'),
      });
      this.client.on('error', (error) => {
        console.error('Redis error:', error);
      });
      this.client.connect();
      RedisManager.instance = this;
      // eslint-disable-next-line prettier/prettier
      console.log('[Tools] RedisManager constructor', this.configService.get('REDIS_URL'));
    } else {
      console.log('[Tools] RedisManager instance already exists');
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

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
    return;
  }

  public async setnx(key: string, value: string): Promise<boolean> {
    const res = await this.client.setNX(key, value);
    return res;
  }

  public async incrBy(key: string, value: number): Promise<number> {
    const res = await this.client.incrBy(key, value);
    return res;
  }

  public async decrBy(key: string, value: number): Promise<number> {
    const res = await this.client.decrBy(key, value);
    return res;
  }
}

// change the return type to RedisClientType
export const getRedisManager = (): any => {
  return RedisManager as unknown as RedisClientType;
};
