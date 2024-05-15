import { User, sampleUsers } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {
    console.log('[Service] UsersService instantiated');
  }

  findOne({ id, username }: { id?: number; username?: string }): User {
    const u = sampleUsers.find(
      (user) => user.id === id || user.username === username,
    );
    if (!u) {
      throw new Error(`User not found`);
    }
    return u;
  }
}
