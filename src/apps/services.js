import _ from 'lodash';

import ExampleService from '../business_logic/services/ExampleService';
import ExampleRepository from '../data_access/repositories/ExampleRepository';

export default async function buildServices() {
  const dependencies = {
    example: new ExampleRepository(),
  };

  return {
    example: new ExampleService(_.pick(dependencies, ['example'])),
  };
}
