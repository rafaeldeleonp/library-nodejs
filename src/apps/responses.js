import _ from 'lodash';
import BadParamsError from '../business_logic/exceptions/BadParamsError';
import BadRequestError from '../business_logic/exceptions/BadRequestError';
import EntityDuplicatedError from '../business_logic/exceptions/EntityDuplicatedError';
import InternalError from '../business_logic/exceptions/InternalError';
import MissingDependenciesError from '../business_logic/exceptions/MissingDependenciesError';
import RecordNotFoundException from '../business_logic/exceptions/RecordNotFoundException';
import UnknownError from '../business_logic/exceptions/UnknownError';
import {getLogger} from '../utils/helper';

const logger = getLogger('responses');

const OK = (data) => {
  if (_.isArray(data)) data = {items: data, total: data.length};
  return {
    ok: true,
    code: 200,
    message: 'success',
    data,
  };
};

const REDIRECT = (url, code = 302) => {
  return {
    ok: true,
    code,
    message: '',
    extras: {
      headers: {
        'Location': url,
      },
      code,
    },
  };
};

const BAD_REQUEST = (error) => {
  return {
    ok: false,
    code: 400,
    error: [error.message],
    message: 'bad-request',
  };
};

const NOT_FOUND = (msg) => {
  return {
    ok: false,
    code: 404,
    error: [msg || 'node does not exist'],
    message: 'not-found',
  };
};

const CONFLICT = (msg) => {
  return {
    ok: false,
    code: 409,
    error: [msg],
    message: 'conflict',
  };
};

const INTERNAL_SERVER_ERROR = (error, msg) => {
  logger.error(msg);
  logger.error(error);
  return {
    ok: false,
    code: 500,
    error: msg ? [msg, error.message] : [error.message],
    message: 'internal-error',
  };
};

export {
  OK,
  REDIRECT,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};

export const wrapError = (e, extras = {}) => {
  logger.error(e);

  if (e instanceof BadParamsError || e instanceof BadRequestError) {
    return BAD_REQUEST(e, extras);
  }
  if (e instanceof RecordNotFoundException) {
    return NOT_FOUND(e, extras);
  }
  if (e instanceof EntityDuplicatedError) {
    return CONFLICT(e, extras);
  }
  if (e instanceof InternalError || e instanceof UnknownError || e instanceof MissingDependenciesError) {
    return INTERNAL_SERVER_ERROR(e, extras);
  }
  if (e instanceof UnknownError) {
    return INTERNAL_SERVER_ERROR(e, extras);
  }

  return INTERNAL_SERVER_ERROR(new UnknownError(e, {
    ...extras,
    debug: 'we do not know what error is coming so wrap it here. Please report it.',
  }));
};
