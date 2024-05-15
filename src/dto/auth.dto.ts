export class LoginDto {
  username: string;
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
