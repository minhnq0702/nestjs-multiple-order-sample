// import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JWT_KEY = 'JWT_SECRET_KEY';
export const JWT_REFRESH_KEY = 'JWT_SECRET_RKEY';

// export const jwtConfig = (): JwtModuleAsyncOptions => {
//   return {
//     useFactory: () => ({
//       secret: process.env.JWT_SECRET_KEY,
//       signOptions: {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//       },
//     }),
//   };
// };

// export const jwtRConfig = (): JwtModuleAsyncOptions => {
//   return {
//     useFactory: () => ({
//       secret: process.env.JWT_SECRET_RKEY,
//       signOptions: {
//         expiresIn: process.env.JWT_REXPRIES_IN,
//       },
//     }),
//   };
// };
