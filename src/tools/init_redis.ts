import { createClient } from 'redis';

// export const redisClient = createClient({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
// });

export const redisClient: any = createClient({
  // url: 'localhost:6379',
});
