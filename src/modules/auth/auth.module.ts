import { UsersModule } from '@module/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@svc/auth.service';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
