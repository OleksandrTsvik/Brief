import ConfigProps from './config.interface';

export default (): ConfigProps => ({
  port: parseInt(process.env.PORT || '5001', 10),
  globalApiPrefix: process.env.GLOBAL_API_PREFIX || 'api',
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  frontendUrl: process.env.FRONTEND_URL,
  jwtAccess: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  },
});
