import Hapi from 'hapi';
import Joi from 'joi';
import startup from './api';
import buildServices from '../apps/services';
import {getLogger} from '../utils/helper';
import {PORT} from '../constants';

const logger = getLogger('hapi server');

const createHandlerWrapper = () => ({handler}) => async (request, reply) => {
  const clients = {
    logger,
  };

  const args = [clients];
  const services = await buildServices(...args);

  const response = await handler.call(services, {
    payload: request.payload || request.body,
    query: { // make criteria object from know params or query.
      ...request.query,
      ...request.params,
    },
    headers: request.headers,
    info: {
      ip: request.info.remoteAddress,
      agent: request.headers['user-agent'],
    },
  }, {
    logger,
  });

  if (!response.ok) {
    return reply(response);
  }

  return reply.response(response);
};

export function init() {
  return new Promise((resolve) => {
    const server = Hapi.Server({
      port: PORT,
    });

    startup({Server: server, Middleware: createHandlerWrapper(), Joi, Logger: logger});

    server.start();

    resolve(server);
  });
}
