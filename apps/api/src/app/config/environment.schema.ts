import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'test', 'prodcution')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_PATH: Joi.string().default('tmp/db.sqlite'),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
});
