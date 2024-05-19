import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

// adding interface for RedisManager
export interface RedisManagerType {
  set(key: string, value: string | number): Promise<string>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<number>;
  setnx(key: string, value: string): Promise<boolean>;
  incrBy(key: string, value: number): Promise<number>;
  decrBy(key: string, value: number): Promise<number>;
}
export const RedisManagerType = Symbol('RedisManagerType');

@Injectable()
export class RedisManager implements RedisManagerType {
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

  public async decrBy(key: string, value: number): Promise<number> {
    const res = await this.client.decrBy(key, value);
    return res;
  }
}

// change the return type to RedisClientType
export const getRedisManager = (): RedisClientType => {
  console.log('[Tools] getRedisManager');
  return new RedisManager() as unknown as RedisClientType;
};
