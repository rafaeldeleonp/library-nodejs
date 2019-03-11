
import {
  read as readValidation,
  readBookPage as readBookPageValidation,
} from '../../../apps/params/book';
import {
  create as createValidation,
  update as updateValidation,
} from '../../../apps/payload/book';
import {read, readBookPage, list, create, update} from '../../../apps/handlers/book';

const entity = 'book';

export default function ({Server, Middleware, Joi}) {
  Server.route({
    method: 'GET',
    path: `/${entity}/{id}`,
    options: {
      validate: {
        params: readValidation(Joi),
      },
    },
    handler: Middleware({
      handler: read,
    }),
  });

  Server.route({
    method: 'GET',
    path: `/${entity}/{id}/page/{number}/{format}`,
    options: {
      validate: {
        params: readBookPageValidation(Joi),
      },
    },
    handler: Middleware({
      handler: readBookPage,
    }),
  });

  Server.route({
    method: 'GET',
    path: `/${entity}s`,
    handler: Middleware({
      handler: list,
    }),
  });

  Server.route({
    method: 'POST',
    path: `/${entity}`,
    options: {
      validate: {
        payload: createValidation(Joi),
      },
    },
    handler: Middleware({
      handler: create,
    }),
  });

  Server.route({
    method: 'PUT',
    path: `/${entity}/{id}`,
    options: {
      validate: {
        params: readValidation(Joi),
        payload: updateValidation(Joi),
      },
    },
    handler: Middleware({
      handler: update,
    }),
  });
}