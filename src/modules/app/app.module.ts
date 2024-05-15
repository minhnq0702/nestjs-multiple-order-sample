import { AuthModule } from '@module/auth/auth.module';
import { OrdersModule } from '@module/orders/orders.module';
import { UsersModule } from '@module/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '@svc/app.service';
import { AppController } from './app.controller';

const _configModule = ConfigModule.forRoot({
  envFilePath: ['.env', '.env.local'],
  isGlobal: true, // * Make the configuration global
  cache: true, // * Enable configuration caching
});

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, _configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {
    console.log('[Module] App created');
  }

  configure(consumer: MiddlewareConsumer) {
    // Middleware configuration goes here
    console.log(`[Module] AppModule Middleware configuration ${consumer}}`);
    // consumer.apply(SampleMiddleware).forRoutes('*');
  }
}
