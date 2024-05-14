import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {
    console.log('[Service] AuthService instantiated');
  }

  // authenticate(username: string, password: string): boolean {
  //   // Authentication logic goes here
  //   console.log(`[Service] Authenticating user: ${username}`);
  //   return true;
  // }
}
