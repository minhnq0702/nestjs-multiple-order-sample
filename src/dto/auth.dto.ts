import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {}

export class SignPayload {
  username: string;
  email: string;
  sub: number | string;
}

export class VerifiedPayload extends SignPayload {
  iat: number;
  exp: number;
}
