import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MockRedisManager } from '@src/svc/tools/mockRedis';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, MockRedisManager],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
