import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('[Service] AppService instantiated');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
