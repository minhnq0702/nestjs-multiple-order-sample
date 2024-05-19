import { SignPayload, VerifiedPayload } from '@dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

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
    if (!username || !password) {
      return false;
    }

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

    return this.signJWT({
      username: user.username,
      email: user.email,
      sub: user.id,
    });
  }

  private signJWT(signPayload: SignPayload) {
    return this.jwtService.sign(signPayload);
  }

  verifyJWT(token: string): [boolean, VerifiedPayload] {
    try {
      const verifiedData = this.jwtService.verify<VerifiedPayload>(token);
      console.log(`[Service] Verified JWT: ${JSON.stringify(verifiedData)}`);
      return [true, verifiedData];
    } catch (error) {
      return [false, null];
    }
  }
}
