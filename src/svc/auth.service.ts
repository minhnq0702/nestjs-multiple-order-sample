import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
    console.log('[Service] AuthService instantiated', usersService);
  }

  authenticate(username: string, password: string): boolean {
    // Authentication logic goes here
    console.log(`[Service] Authenticating user: ${username} - ${password}`);

    // * Find user by username
    const user = this.usersService.findOne({ username: username });
    if (!user) {
      console.error(`[Service] User ${username} not found`);
      return false;
    }

    // * Check password
    if (password !== 'password') {
      console.error(`[Service] Invalid password for ${username}`);
      return false;
    }
    return true;
  }
}
