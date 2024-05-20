import { User, sampleUsers } from '@entities/user.entity';
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

  findOne({ id, username }: { id?: number | string; username?: string }): User | undefined {
    const u = sampleUsers.find((user) => user.id === id || user.username === username);
    return u;
  }

  async create(user: User): Promise<User> {
    const userExists = this.checkExistence(user.username);

    // hash password
    const _hashPassword = bcrypt.hash(user.password, 10);

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
