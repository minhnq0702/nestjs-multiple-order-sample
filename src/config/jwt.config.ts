import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig = (): JwtModuleAsyncOptions => {
  return {
    useFactory: () => ({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  };
};
