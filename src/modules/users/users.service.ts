import { User } from '@entities/user.entity';
import { LoggerService } from '@module/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserAlreadyExist } from '@src/entities/error.entity';
import { RedisManagerType } from '@src/svc/tools/redis';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RedisManagerType) private readonly redisClient: RedisManagerType,
    private readonly logger: LoggerService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne({ id, username }: { id?: number | string; username?: string }): Promise<User> {
    const _user: string = await this.redisClient.get(`user:${username}`);
    if (!_user) {
      return null;
    }

    try {
      const u: User = JSON.parse(_user);
      return u;
    } catch (error) {
      this.logger.error('Error parsing user from Redis', error);
      return null;
    }
  }

  async listUsers(): Promise<User[]> {
    const users: User[] = [];
    const keys = await this.redisClient.keys('user:*');
    for (const key of keys) {
      console.log(key);
      const user = await this.redisClient.get(key);
      users.push(JSON.parse(user));
    }
    return users;
  }

  async create(user: User): Promise<User> {
    // Check if user already exists in redis
    const userIsExisted = this.checkExistence(user.username);

    // hash password
    const _hashPassword = this.hashPassword(user.password);

    if (await userIsExisted) {
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

  async update(user: User, fieldsUpdate: { refreshToken?: string }): Promise<User> {
    // Check if user exists
    const _user = await this.findOne({ username: user.username });
    if (!_user) {
      return null;
    }

    if (fieldsUpdate) {
      Object.keys(fieldsUpdate).forEach((key) => {
        if (fieldsUpdate[key] !== undefined) {
          _user[key] = fieldsUpdate[key];
        }
      });
      _user.updateDate = new Date();
    }

    // update user in Redis
    this.redisClient.set(`user:${_user.username}`, JSON.stringify(_user));
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(user: User): Promise<boolean> {
    // TODO delete user from Redis
    return new Promise((resolve) => resolve(true));
  }

  async checkExistence(username: string): Promise<boolean> {
    // check if user exists in Redis
    const user = await this.redisClient.get(`user:${username}`);
    return user !== null;
  }
}
