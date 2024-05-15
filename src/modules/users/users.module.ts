import { Module } from '@nestjs/common';
import { UsersService } from '@svc/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
