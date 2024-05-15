import { User, sampleUsers } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {
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
}
