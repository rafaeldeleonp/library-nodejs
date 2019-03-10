import _ from 'lodash';
import {getLogger} from '../../utils/helper';

const logger = getLogger('normalizer');

const K_SKIP_ERROR = 'K_SKIP_ERROR';

const isModel = function(value) {
  try {
    return value && value.constructor && value.constructor.name === 'model';
  } catch (e) {
    return false;
  }
};

const defaultsOptions = {
  raiseSkipError: true, serializer: 'toObject', normalizer: null,
};

const serialize = function(doc, serializer, args = []) {
  if (!serializer) return doc;
  if (_.isFunction(serializer)) return serializer(doc, ...args);
  return isModel(doc) && _.isFunction(doc[serializer]) ? doc[serializer].call(doc, ...args) : doc;
};

const normalize_ = (promiseCaller, options) => {
  let isInRequest = false;
  let lastPromiseInvoke = null;
  let lastPromiseReject = null;

  const callNext = () => {
    if (lastPromiseInvoke !== null) {
      isInRequest = true;
      lastPromiseInvoke();

      lastPromiseInvoke = null;
      lastPromiseReject = null;
    }
  };

  const _serialize = (value, args) => {
    if (options.multiArgs && !args) {
      args = value.slice(1);
      value = value[0];
    }
    if (_.isArray(value)) return value.map((doc) => serialize(doc, options.serializer, args));
    return serialize(value, options.serializer, args);
  };

  const wrapPromise = (promise) => {
    return promise.then(res => {
      isInRequest = false;
      callNext();
      if (options.serializeAt) {
        let val = res;
        let args;
        if (options.multiArgs) {
          val = res[0];
          args = res.slice(1);
        }
        const toSerialize = _.get(val, options.serializeAt);
        return _.set(val, options.serializeAt, _serialize(toSerialize, args));
      }
      return _serialize(res);

    }).catch(e => {
      logger.error(e, e.stack); // eslint-disable-line no-console
      isInRequest = false;
      callNext();
      throw e;
    });
  };

  return (...args) => {
    if (!isInRequest) {
      isInRequest = true;
      if (options.normalizer && args.length > 0) {
        const data = args[0];
        const rest = args.length > 1 ? args.splice(1) : [];
        const normalized = options.normalizer(data);
        args = Array.concat([normalized], rest);
      }
      return wrapPromise(promiseCaller.apply(null, args));
    }

    if (lastPromiseReject !== null) {
      lastPromiseReject();
      lastPromiseInvoke = null;
      lastPromiseReject = null;
    }

    return new Promise((resolve, reject) => {
      lastPromiseInvoke = () => {
        wrapPromise(promiseCaller.apply(null, args)).then(res => resolve(res)).catch(e => reject(e));
      };

      lastPromiseReject = () => {
        if (options.raiseSkipError) {
          reject(new Error(K_SKIP_ERROR));
        }
      };
    });
  };
};

export default function normalizer(options = defaultsOptions) {
  return (target, key, descriptor) => {
    return {
      configurable: true,
      enumerable: true,
      get() {
        let classMethod = (typeof descriptor.get !== 'function') ? descriptor.value : descriptor.get.call(this);

        if (typeof classMethod !== 'function') {
          throw new Error(`@serialize decorator can only be applied to methods not: ${typeof classMethod}`);
        }

        let classMethodBinded = classMethod.bind(this);
        let serializedCallFn = normalize_(classMethodBinded, _.merge({}, defaultsOptions, options));

        Object.defineProperty(this, key, {
          value: serializedCallFn,
          configurable: true,
          writable: true,
        });

        return serializedCallFn;
      },
    };
  };
}
