import { AuthController } from '@module/auth/auth.controller';
import { UsersModule } from '@module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@svc/auth.service';
import { jwtConfig } from '../../../src/config/jwt.config';

describe('AuthController', () => {
  let controller: AuthController;

  // const _configModule = ConfigModule.forRoot({
  //   envFilePath: ['.env', '.env.development'],
  //   isGlobal: true, // * Make the configuration global
  //   cache: true, // * Enable configuration caching
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule.registerAsync(jwtConfig())],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
