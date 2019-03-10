import Mongoose from 'mongoose';
import {getLogger} from '../utils/helper';
import {MONGO_URI, DEBUG_MONGO} from '../constants';

Mongoose.set('debug', Boolean(DEBUG_MONGO));

const logger = getLogger('mongodb');

let modelLoaded = false;

export const disconnect = () => {
  if (Mongoose.connection.readyState) {
    return Mongoose.connection ? Mongoose.connection.close() : null;
  }
};

export const connect = () => {
  return new Promise((resolve, reject) => {
    loadModels();

    if (!Mongoose.connection.readyState) {
      Mongoose.connect(MONGO_URI || undefined, {useNewUrlParser: true, useFindAndModify: false});
      Mongoose.connection.once('error', (e) => {
        logger.error({error: e}, 'mongooose connection error.');
        reject(e);
      });

      Mongoose.connection.once('connected', () => {
        logger.info(`MongoDB connected successfully on URI: ${MONGO_URI}`);
        resolve(disconnect);
      });

      return;
    }

    resolve(disconnect);
  });
};

export function loadModels() {
  if (modelLoaded) return;
  modelLoaded = true;

  /* Import models to be loaded on mongoose.models because models should not be imported using
  import statement.
  */
  require('../data_access/schemas/example');
  require('../data_access/schemas/book');
}
