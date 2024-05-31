import { User } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UserAlreadyExist } from '@src/entities/error.entity';
import { RedisManagerType } from '@src/svc/tools/redis';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@Inject(RedisManagerType) private readonly redisClient: RedisManagerType) {
    console.log('[Service] UsersService instantiated');
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne({ id, username }: { id?: number | string; username?: string }): Promise<User> {
    // const u = sampleUsers.find((user) => user.id === id || user.username === username);
    const _user: string = await this.redisClient.get(`user:${username}`);
    if (!_user) {
      return null;
    }

    try {
      const u: User = JSON.parse(_user);
      return u;
    } catch (error) {
      console.error('Error parsing user from Redis', error);
      return null;
    }
  }

  async create(user: User): Promise<User> {
    // Check if user already exists in redis
    const userExists = this.checkExistence(user.username);

    // hash password
    const _hashPassword = this.hashPassword(user.password);

    if (await userExists) {
      throw new UserAlreadyExist();
    } else {
      // generate uuid
      user.id = v4().toString();
      user.password = await _hashPassword;
    }

    // add user to Redis
    this.redisClient.set(`user:${user.username}`, JSON.stringify(user));
    return user;
  }

  async checkExistence(username: string): Promise<boolean> {
    // check if user exists in Redis
    const user = await this.redisClient.get(`user:${username}`);
    return user !== null;
  }
}
