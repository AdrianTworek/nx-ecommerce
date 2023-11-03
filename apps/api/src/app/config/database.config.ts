import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

const isDevelopment = process.env.NODE_ENV === 'development';

export default registerAs('database', () => ({
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  synchronize: isDevelopment,
  logging: isDevelopment,
  autoLoadEntities: isDevelopment,
}));
