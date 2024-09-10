import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@src/modules/logger/logger.service';
import { RedisClientType, createClient } from 'redis';

// adding interface for RedisManager
export interface RedisManagerType {
  keys(pattern: string): Promise<string[]>;
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
  private readonly logger: LoggerService;

  constructor(private readonly configService: ConfigService) {
    if (!RedisManager.instance) {
      // ? shuold import logger svc which is provided in modules level?
      this.logger = new LoggerService('RedisManager');
      this.client = createClient({
        url: this.configService.get('REDIS_URL'),
      });
      this.client.on('error', (error) => {
        console.error('Redis error:', error);
      });
      this.client.connect();
      RedisManager.instance = this;
      // eslint-disable-next-line prettier/prettier
      this.logger.log(`RedisManager initialize.....`);
    } else {
      RedisManager.instance.logger.warn('RedisManager instance already exists');
    }
    return RedisManager.instance;
  }

  public async keys(pattern: string): Promise<string[]> {
    const res = await this.client.keys(pattern);
    return res;
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
  return RedisManager;
};
