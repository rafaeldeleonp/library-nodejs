
import {
  read as readValidation,
} from '../../../apps/params/author';
import {
  create as createValidation,
  update as updateValidation,
} from '../../../apps/payload/author';
import {read, list, create, update} from '../../../apps/handlers/author';

const entity = 'author';

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