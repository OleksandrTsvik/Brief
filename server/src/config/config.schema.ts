import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(5001),
  GLOBAL_API_PREFIX: Joi.string().default('api'),

  SQLITE_DATABASE: Joi.string().required(),

  FRONTEND_URL: Joi.string().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
});
