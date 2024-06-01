import { AuthModule } from '@module/auth/auth.module';
import { OrdersModule } from '@module/orders/orders.module';
import { UsersModule } from '@module/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';

const _configModule = ConfigModule.forRoot({
  envFilePath: ['.env', '.env.local'],
  isGlobal: true, // * Make the configuration global
  cache: true, // * Enable configuration caching
});

@Module({
  imports: [LoggerModule.register('RootApp'), AuthModule, UsersModule, OrdersModule, _configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly logger: LoggerService) {
    this.logger.log('RootApp created');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer) {
    // Middleware configuration
    this.logger.log(`AppModule Middleware configuration`);

    // User consumer to apply your middleware to specific routes
    // consumer.apply(SampleMiddleware).forRoutes('*');
  }
}
