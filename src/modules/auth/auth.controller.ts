import { LoginDto, RegisterDto } from '@dto/auth.dto';
import { AuthService } from '@module/auth/auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Public } from '@src/config/auth.config';
import { LoginFail } from '@src/entities/error.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServce: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginPayload: LoginDto, @Res() res: Response) {
    const jwtKey = this.authServce.authenticate(loginPayload.username, loginPayload.password);

    if (!jwtKey) {
      throw new LoginFail();
    }

    return res
      .status(200)
      .header('Set-Cookie', `token=${jwtKey.toString()}; Path=/; HttpOnly; Secure; SameSite=Lax`)
      .send({
        msg: `Logged in as ${loginPayload.username}`,
      });
  }

  // @Post('logout')
  // async logout(@Req() req, @Res() res) {
  //   return res.send('Logged out');
  // }

  @Public()
  @Post('register')
  async register(@Body() registerPayload: RegisterDto) {
    console.debug('Register payload', registerPayload);
    await this.authServce.register(registerPayload.username, registerPayload.password);
    return '// TODO this is register API';
  }
}
