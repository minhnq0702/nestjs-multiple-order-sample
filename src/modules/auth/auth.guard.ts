import { AuthService } from '@module/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from '@src/config/auth.config';
import { VerifiedPayload } from '@src/dto/auth.dto';
import { Request } from 'express';

type RequestWithUser = Request & { user: VerifiedPayload };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    // * Skip if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const token = this.getTokenFromRequest(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    const [validated, verifiedData] = this.authService.verify_JWT(token);
    if (!validated) {
      throw new UnauthorizedException();
    }
    req.user = verifiedData;
    return true;
  }

  getTokenFromRequest(req: Request): string {
    const cookies = (req.headers.cookie?.split(';') ?? []).map((c) => c.trim());
    const jwtCookie = cookies.find((c) => c.startsWith('token='));
    const [, token] = jwtCookie?.split('=') || [];
    return token ?? '';
  }
}
