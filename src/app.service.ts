import { LoggerService } from '@module/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
