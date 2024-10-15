import * as Joi from 'joi';
export const SchemaValidation=Joi.object({

MONGODB:Joi.string().required().default('mongodb://:KXvUERqjjlWAgCpDzVqrXspXGXXeuquV@autorack.proxy.rlwy.net:39605'),
PORT:Joi.number().required().default(3000),
DEFAULT_LIMIT:Joi.number().required().default(10),
})