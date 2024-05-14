import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
    console.log('[Service] AuthService instantiated', usersService);
  }

  // authenticate(username: string, password: string): boolean {
  //   // Authentication logic goes here
  //   console.log(`[Service] Authenticating user: ${username}`);
  //   return true;
  // }
}
