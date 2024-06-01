import { AuthService } from '@module/auth/auth.service';
import { LoggerModule } from '@module/logger/logger.module';
import { UsersModule } from '@module/users/users.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [LoggerModule.register('AuthModule'), UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD, // * Register AuthGuard as global guard
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
