import Joi from 'joi';
import _ from 'lodash';
import bunyan from 'bunyan';
import {Types} from 'mongoose';
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

export function getObjectIds(ids, toString = true) {
  if (!_.isArray(ids) || _.isEmpty(ids)) return ids;
  return ids.map((id) => getObjectId(id, toString));
}

export function getObjectId(id, toString = false) {
  if (toString && id instanceof Types.ObjectId) {
    return id.toString();
  }
  return id ? (_.isString(id) && Types.ObjectId.isValid(id) && toString === false) ? new Types.ObjectId(id) : id : null;
}
