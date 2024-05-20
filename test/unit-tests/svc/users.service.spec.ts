import { UsersService } from '@module/users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRedisManager } from '@src/svc/tools/mockRedis';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, MockRedisManager],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
