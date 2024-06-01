import { Injectable } from '@nestjs/common';
import { RedisManagerType } from './redis';

@Injectable()
export class MockRedisManager implements RedisManagerType {
  private data: Map<string, string>;

  constructor() {
    this.data = new Map();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async keys(pattern: string): Promise<string[]> {
    return Promise.resolve([]);
  }

  async set(key: string, value: string): Promise<string> {
    this.data.set(key, value);
    return value;
  }

  async get(key: string): Promise<string | null> {
    return this.data.get(key) || null;
  }

  async setnx(key: string, value: string): Promise<boolean> {
    if (this.data.has(key)) {
      return false;
    } else {
      this.data.set(key, value);
      return true;
    }
  }

  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  async incrBy(key: string, increment: number): Promise<number> {
    const currentValue = this.data.get(key);
    if (currentValue) {
      const newValue = parseInt(currentValue) + increment;
      this.data.set(key, newValue.toString());
      return newValue;
    } else {
      this.data.set(key, increment.toString());
      return increment;
    }
  }

  async decrBy(key: string, decrement: number): Promise<number> {
    const currentValue = this.data.get(key);
    if (currentValue) {
      const newValue = parseInt(currentValue) - decrement;
      this.data.set(key, newValue.toString());
      return newValue;
    } else {
      this.data.set(key, (-decrement).toString());
      return -decrement;
    }
  }

  // async keys(pattern: string): Promise<string[]> {
  //   const regex = new RegExp(pattern.replace('*', '.*'));
  //   return Array.from(this.data.keys()).filter((key) => regex.test(key));
  // }
}

export const getMockRedisManager = (): any => MockRedisManager as unknown as RedisManagerType;
