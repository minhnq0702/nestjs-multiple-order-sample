import { UsersModule } from '@module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@svc/auth.service';
import { AuthController } from '../auth/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const _configModule = ConfigModule.forRoot({
    envFilePath: ['.env', '.env.development'],
    isGlobal: true, // * Make the configuration global
    cache: true, // * Enable configuration caching
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, _configModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
