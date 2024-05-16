import { AuthService } from '@module/auth/auth.service';
import { UsersModule } from '@module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConfig } from '@src/config/jwt.config';

describe('AuthService', () => {
  let service: AuthService;

  // const _configModule = ConfigModule.forRoot({
  //   envFilePath: ['.env', '.env.development'],
  //   isGlobal: true, // * Make the configuration global
  //   cache: true, // * Enable configuration caching
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule.registerAsync(jwtConfig())],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userService should be defined', () => {
    expect(service.usersService).toBeDefined();
  });
});
