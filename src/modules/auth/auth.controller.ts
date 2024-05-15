import { LoginDto } from '@dto/login.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@svc/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServce: AuthService) {}

  @Post('login')
  login(@Body() loginPayload: LoginDto, @Res() res: Response) {
    try {
      this.authServce.authenticate(
        loginPayload.username,
        loginPayload.password,
      );
      return res.status(200).send(`Logged in as ${loginPayload.username}`);
    } catch (error) {
      return res.status(401).send({
        msg: 'Unauthorized',
      });
    }
  }

  // @Post('logout')
  // async logout(@Req() req, @Res() res) {
  //   return res.send('Logged out');
  // }
}
