import { AuthService } from '@module/auth/auth.service';
import { UsersModule } from '@module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
// import { jwtConfig } from '@src/config/jwt.config';
import { getMockRedisManager } from '@src/svc/tools/mockRedis';
import { RedisManagerType } from '@src/svc/tools/redis';

beforeAll(() => {
  console.log('BEFORE ALLLLLL');
  process.env = Object.assign(process.env, {
    REDIS_HOST: 'localhost',
    REDIS_PORT: '6379',
    REDIS_PASSWORD: 'password',
  });
});

describe('Test Descript', () => {
  console.log('test descript with before all');
  it('Test', () => {
    expect(1).toBe(1);
  });
});

describe('AuthService', () => {
  console.log('AuthService descript with before all');
  let service: AuthService;

  // const _configModule = ConfigModule.forRoot({
  //   envFilePath: ['.env', '.env.development'],
  //   isGlobal: true, // * Make the configuration global
  //   cache: true, // * Enable configuration caching
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      providers: [
        AuthService,
        {
          provide: RedisManagerType,
          useClass: getMockRedisManager(),
        },
      ],
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
