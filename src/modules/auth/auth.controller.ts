import { LoginDto } from '@dto/auth.dto';
import { AuthService } from '@module/auth/auth.service';
import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../../config/auth.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServce: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginPayload: LoginDto, @Res() res: Response) {
    try {
      const jwtKey = this.authServce.authenticate(
        loginPayload.username,
        loginPayload.password,
      );

      if (!jwtKey) {
        throw new UnauthorizedException();
      }

      return res
        .status(200)
        .header(
          'Set-Cookie',
          `token=${jwtKey.toString()}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        )
        .send({
          msg: `Logged in as ${loginPayload.username}`,
        });
    } catch (error) {
      switch (error.constructor) {
        case UnauthorizedException:
          return res.status(401).send({
            msg: 'Unauthorized',
          });
        default:
          return res.status(500).send({
            msg: 'Internal server error',
          });
      }
    }
  }

  // @Post('logout')
  // async logout(@Req() req, @Res() res) {
  //   return res.send('Logged out');
  // }
}
