import { Module } from '@nestjs/common';
import { UsersService } from '@svc/users.service';

@Module({
  providers: [UsersService],
})
export class UsersModule {}
