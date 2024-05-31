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
  async login(@Body() loginPayload: LoginDto, @Res() res: Response) {
    const authResult = await this.authServce.authenticate(loginPayload.username, loginPayload.password);
    if (typeof authResult === 'boolean') {
      throw new LoginFail();
    }
    const [jwtKey, refreshKey] = authResult;

    if (!jwtKey) {
      throw new LoginFail();
    }

    // .header('Set-Cookie', `token=${jwtKey.toString()}; Path=/; HttpOnly; Secure; SameSite=Lax`)
    return res
      .status(200)
      .cookie('token', jwtKey.toString(), { httpOnly: true, secure: true, sameSite: 'lax' })
      .send({
        msg: `Logged in as ${loginPayload.username}`,
        refreshToken: refreshKey,
      });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    // return res.send('Logged out');
    return res.status(200).clearCookie('token').send('Logged out');
  }

  @Public()
  @Post('register')
  async register(@Body() registerPayload: RegisterDto) {
    console.debug('Register payload', registerPayload);
    await this.authServce.register(registerPayload.username, registerPayload.password);
    return '// TODO this is register API';
  }
}
