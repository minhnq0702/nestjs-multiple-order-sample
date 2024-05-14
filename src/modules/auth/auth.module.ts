import { UsersModule } from '@module/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from '@svc/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
