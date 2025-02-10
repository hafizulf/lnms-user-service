// Important Note: Do not change the Joi import style to default import
// Reason: the app will be terminated because the Joi is undefined
import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('local', 'development', 'staging', 'production')
    .default('development'),
  APP_PORT: Joi.number().required(),
  GRPC_URL: Joi.string().required(),
});

export const EnvValidationOptions = {
  allowUnknown: true,
  abortEarly: false,
};
