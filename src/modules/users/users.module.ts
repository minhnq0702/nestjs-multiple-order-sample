import { LoggerModule } from '@module/logger/logger.module';
import { Module } from '@nestjs/common';
import { UsersService } from '@src/modules/users/users.service';
import { RedisManagerType, getRedisManager } from '@src/svc/tools/redis';
import { UsersController } from './users.controller';

@Module({
  imports: [LoggerModule.register('UsersModule')],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: RedisManagerType,
      useClass: getRedisManager(),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
