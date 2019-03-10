
import {
  read as readValidation,
} from '../../../apps/params/example';
import {
  create as createValidation,
  update as updateValidation,
} from '../../../apps/payload/example';
import {read, list, create, update} from '../../../apps/handlers/example';

const entity = 'example';

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
    path: `/${entity}`,
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