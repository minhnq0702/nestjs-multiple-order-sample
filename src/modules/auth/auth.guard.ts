import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '@svc/auth.service';
import { Request } from 'express';
import { IS_PUBLIC } from '../../config/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
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
    const validated = this.authService.verifyJWT(token);
    if (!validated) {
      throw new UnauthorizedException();
    }
    return true;
  }

  getTokenFromRequest(req: Request): string {
    const _cookie = req.headers.cookie;
    if (!_cookie) {
      return '';
    }

    const cookies = _cookie.split(';').map((c) => c.trim());
    const jwtCookie = cookies.find((c) => c.startsWith('token='));
    if (!jwtCookie) {
      return '';
    }

    const _vals = jwtCookie.split('=');
    if (_vals.length === 2) {
      return _vals[1];
    }
    return '';
  }
}
