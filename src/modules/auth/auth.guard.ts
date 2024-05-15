import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC } from '../../config/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    // * Skip if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const token = this.getTokenFromRequest(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    return true;
  }

  getTokenFromRequest(req: Request): string {
    const _cookie = req.headers.cookie;
    if (!_cookie) {
      return '';
    }

    const _vals = _cookie.split('=');
    if (_vals.length === 2) {
      return _vals[1];
    }
    return '';
  }
}
