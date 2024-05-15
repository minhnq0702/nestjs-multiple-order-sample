import { sampleUsers } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {
    console.log('[Service] UsersService instantiated');
  }

  findOne({ id, username }: { id?: number; username?: string }) {
    const u = sampleUsers.find(
      (user) => user.id === id || user.username === username,
    );
    if (!u) {
      throw new Error(`User not found`);
    }
    return `This action returns a #${id} user`;
  }
}
