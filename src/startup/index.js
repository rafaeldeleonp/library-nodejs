import 'babel-polyfill';
import {init} from './server';
import {connect} from './database';
import {getLogger} from '../utils/helper';
import {NODE_ENV, PORT} from '../constants';

const logger = getLogger('startup');
logger.info(`Running ${NODE_ENV} environment`);

process.on('unhandledRejection', (r) => {
  logger.error('Unhandled Promise Rejection', r);
  process.exit(1);
});

(() => {
  connect().then(() => {
    init().then(() => {
      logger.info(`Server started on port: ${PORT}`);
    }).catch((e) => {
      logger.error('Error starting server: ', e);
    });
  }).catch((e) => {
    logger.error('Error starting', e);
  });
})();
