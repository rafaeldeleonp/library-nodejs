import Joi from 'joi';
import bunyan from 'bunyan';
import { DEBUG_LEVEL } from '../constants';
import BadParamsError from '../business_logic/exceptions/BadParamsError';

const loggers = {};

export function getLogger(name, options = {}) {
  if (loggers[name]) return loggers[name];
  const loggerInstance = bunyan.createLogger({
    name: `library:${name}`,
    level: DEBUG_LEVEL || 'fatal',
    ...options,
  });

  loggers[name] = loggerInstance;
  return loggerInstance;
}

export function validateSchema(value, schema, wrap = true) {
  const result = Joi.validate(value, schema, {abortEarly: false}); // collect all errors on value through schema.

  if (result.error) {
    if (wrap) throw new BadParamsError(result.error.message, result.error.details);
    throw result.error;
  }

  return result.value;
}

export function getIdFromObject(params) {
  const id = params.id || params._id || undefined;
  return id ? id.toString() : id;
}
