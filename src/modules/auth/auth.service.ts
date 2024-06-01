import { SignPayload, VerifiedPayload } from '@dto/auth.dto';
import { LoggerService } from '@module/logger/logger.service';
import { UsersService } from '@module/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_REFRESH_KEY } from '@src/config/jwt.config';
import { User } from '@src/entities/user.entity';

@Injectable()
export class AuthService {
  // private readonly logger = new Logger(AuthService.name);
  usersService: UsersService;
  jwtService: JwtService;

  constructor(
    usersService: UsersService,
    jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    this.logger.log('AuthService instantiated');
  }

  async authenticate(username: string, password: string): Promise<[string, string] | boolean> {
    // Authentication logic goes here
    if (!username || !password) {
      return false;
    }

    // * Find user by username
    const user = await this.usersService.findOne({ username: username });
    if (!user) {
      this.logger.debug(`User ${username} not found`);
      return false;
    }

    // * Check password
    if ((await this.usersService.comparePassword(password, user.password)) === false) {
      this.logger.debug(`Invalid password for ${username}`);
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
      this.logger.debug(`Verified JWT: ${JSON.stringify(verifiedData)}`);
      return [true, verifiedData];
    } catch (error) {
      return [false, null];
    }
  }

  async register(username: string, password: string): Promise<boolean> {
    // Registration logic goes here
    this.logger.debug(`Registering user: ${username}`);
    if (!username || !password) {
      return false;
    }

    // * Check if user exists
    const user = await this.usersService.findOne({ username: username });
    if (user) {
      this.logger.debug(`User ${username} already exists`);
      return false;
    }

    // * Create user
    await this.usersService.create({ username, password });
    return true;
  }

  async refreshToken(token: string): Promise<[string, string]> {
    // Refresh token logic goes here
    const [isValid, payload] = this.verify_JWT(token, JWT_REFRESH_KEY);
    if (!isValid) {
      this.logger.debug(`Invalid token: ${token}`);
      return [null, null];
    }

    // * Check if token is in Redis / Database
    const user = await this.usersService.findOne({ username: payload.username });
    if (!user) {
      this.logger.debug(`User not found: ${payload.username}`);
      return [null, null];
    }

    if (!user.refreshToken || user.refreshToken !== token) {
      this.logger.debug(`Invalid refresh token: ${token}`);
      return [null, null];
    }

    // * Generate new tokens
    const [newToken, newRefreshToken] = await this.get_tokens(user);

    // * Update refresh token in user
    this.usersService.update(user, { refreshToken: newRefreshToken });
    return [newToken, newRefreshToken];
  }
}
