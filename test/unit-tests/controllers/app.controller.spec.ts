import { AppController } from '@module/app/app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '@svc/app.service';
import { RedisManager } from '@svc/tools/redis';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, RedisManager],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
