import { User, sampleUsers } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UserAlreadyExist } from '@src/entities/error.entity';
import { RedisManagerType } from '@src/svc/tools/redis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RedisManagerType) private readonly redisClient: RedisManagerType,
  ) {
    console.log('[Service] UsersService instantiated');
  }

  findOne({
    id,
    username,
  }: {
    id?: number;
    username?: string;
  }): User | undefined {
    const u = sampleUsers.find(
      (user) => user.id === id || user.username === username,
    );
    return u;
  }

  create(user: User): User {
    // ! This is a mock implementation
    // sampleUsers.push(user);
    if (this.checkExistence(user.username)) {
      throw new UserAlreadyExist();
    }

    const _hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = _hashPassword;

    // add user to Redis
    this.redisClient.set(`user:${user.username}`, JSON.stringify(user));
    return user;
  }

  checkExistence(username: string): boolean {
    // check if user exists in Redis
    const user = this.redisClient.get(`user:${username}`);
    return user !== null;
  }
}
