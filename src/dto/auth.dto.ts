import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignPayload {
  username: string;
  email: string;
  sub: number;
}

export class VerifiedPayload extends SignPayload {
  iat: number;
  exp: number;
}
