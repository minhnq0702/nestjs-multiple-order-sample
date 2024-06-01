import { LoginDto, RefreshTokenDto, RegisterDto } from '@dto/auth.dto';
import { AuthService } from '@module/auth/auth.service';
import { LoggerService } from '@module/logger/logger.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Public } from '@src/config/auth.config';
import { LoginFail, RegisterFail } from '@src/entities/error.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServce: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginPayload: LoginDto, @Res() res: Response) {
    const authResult = await this.authServce.authenticate(loginPayload.username, loginPayload.password);
    if (typeof authResult === 'boolean') {
      throw new LoginFail();
    }
    const [token, refreshToken] = authResult;

    if (!token) {
      throw new LoginFail();
    }

    // .header('Set-Cookie', `token=${token.toString()}; Path=/; HttpOnly; Secure; SameSite=Lax`)
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax' })
      .send({
        msg: `Logged in as ${loginPayload.username}`,
        refreshToken: refreshToken,
      });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    // return res.send('Logged out');
    return res.status(200).clearCookie('token').send('Logged out');
  }

  @Public()
  @Post('register')
  async register(@Body() registerPayload: RegisterDto, @Res() res: Response) {
    console.debug('Register payload', registerPayload);
    const success = await this.authServce.register(registerPayload.username, registerPayload.password);
    if (!success) {
      throw new RegisterFail({
        msg: 'User already exists',
      });
    }
    return res.status(201).send({
      msg: 'Register successfully!',
    });
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto, @Res() res: Response) {
    this.logger.log('Cai gi day troi oi');
    // Check if refresh token is valid by decode it
    // If valid, check if token is existed in Redis / Databse
    // If valid, generate new token + refreshToken and return them
    const [token, refreshToken] = await this.authServce.refreshToken(body.refreshToken);

    // If not, return 401
    if (!token || !refreshToken) {
      throw new LoginFail();
    }

    return res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax' }).send({
      msg: 'Token refreshed',
      refreshToken: refreshToken,
    });
  }
}
