import { SignPayload, VerifiedPayload } from '@dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_REFRESH_KEY } from '@src/config/jwt.config';
import { User } from '@src/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;

  constructor(
    usersService: UsersService,
    jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    console.log('[Service] AuthService instantiated');
  }

  async authenticate(username: string, password: string): Promise<[string, string] | boolean> {
    // Authentication logic goes here
    console.log(`[Service] Authenticating user: ${username} - ${password}`);
    if (!username || !password) {
      return false;
    }

    // * Find user by username
    const user = await this.usersService.findOne({ username: username });
    if (!user) {
      console.error(`[Service] User ${username} not found`);
      return false;
    }

    // * Check password
    if ((await this.usersService.comparePassword(password, user.password)) === false) {
      console.error(`[Service] Invalid password for ${username}`);
      return false;
    }

    // * Generate tokens
    const [token, refreshToken] = await this.get_tokens(user);

    // * Update refresh token in user
    this.usersService.update(user, { refreshToken: refreshToken });
    return [token, refreshToken];
  }

  private async get_tokens(user: User): Promise<[string, string]> {
    return Promise.all([
      this.sign_JWT({
        username: user.username,
        email: user.email,
        sub: user.id,
      }),
      this.sign_REFRESH_JWT({
        username: user.username,
        email: user.email,
        sub: user.id,
      }),
    ]);
  }

  private async sign_JWT(signPayload: SignPayload) {
    return this.jwtService.signAsync(signPayload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  private async sign_REFRESH_JWT(signPayload: SignPayload) {
    return this.jwtService.signAsync(signPayload, {
      secret: this.configService.get<string>('JWT_SECRET_RKEY'),
      expiresIn: this.configService.get<string>('JWT_REXPRIES_IN'),
    });
  }

  verify_JWT(token: string, key: string): [boolean, VerifiedPayload] {
    try {
      const verifiedData = this.jwtService.verify<VerifiedPayload>(token, {
        secret: this.configService.get<string>(key),
      });
      console.log(`[Service] Verified JWT: ${JSON.stringify(verifiedData)}`);
      return [true, verifiedData];
    } catch (error) {
      return [false, null];
    }
  }

  async register(username: string, password: string): Promise<boolean> {
    // Registration logic goes here
    console.log(`[Service] Registering user: ${username} - ${password}`);
    if (!username || !password) {
      return false;
    }

    // * Check if user exists
    const user = this.usersService.findOne({ username: username });
    if (user) {
      console.error(`[Service] User ${username} already exists`);
      return false;
    }

    // * Create user
    await this.usersService.create({ username, password });
    return true;
  }

  async refreshToken(token: string): Promise<[string, string]> {
    // Refresh token logic goes here
    console.log(`[Service] Refreshing token: ${token}`);
    const [isValid, payload] = this.verify_JWT(token, JWT_REFRESH_KEY);
    if (!isValid) {
      console.error(`[Service] Invalid token: ${token}`);
      return [null, null];
    }

    // * Check if token is in Redis / Database
    const user = await this.usersService.findOne({ username: payload.username });
    if (!user) {
      console.error(`[Service] User not found: ${payload.username}`);
      return [null, null];
    }

    // * Generate new tokens
    const [newToken, newRefreshToken] = await this.get_tokens(user);
    return [newToken, newRefreshToken];
  }
}
