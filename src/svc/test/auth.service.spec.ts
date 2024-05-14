import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@svc/users.service';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
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
