import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SampleMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    // Middleware logic goes here
    // console.info(`[Middleware] Sample middleware executed [${req.method}]: ${req.url}: ${new Date().toUTCString()}`);
    req.on('end', () => {
      console.log(`[Middleware] Sample middleware ended [${req.method}]: ${req.url}: ${new Date().toUTCString()}`);
    });
    next();
  }
}
