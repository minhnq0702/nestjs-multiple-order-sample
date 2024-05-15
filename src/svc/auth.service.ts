import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    console.log('[Service] AuthService instantiated');
  }

  authenticate(username: string, password: string): boolean | string {
    // Authentication logic goes here
    console.log(`[Service] Authenticating user: ${username} - ${password}`);

    // * Find user by username
    const user = this.usersService.findOne({ username: username });
    if (!user) {
      console.error(`[Service] User ${username} not found`);
      return false;
    }

    // * Check password
    if (user.password !== password) {
      console.error(`[Service] Invalid password for ${username}`);
      return false;
    }

    return this.jwtService.sign({
      username: user.username,
      email: user.email,
      sub: user.id,
    });
  }
}
