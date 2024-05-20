import { Module } from '@nestjs/common';
import { UsersService } from '@src/modules/users/users.service';
import { RedisManagerType, getRedisManager } from '@src/svc/tools/redis';

@Module({
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
