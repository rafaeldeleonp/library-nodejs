import _ from 'lodash';

import ExampleService from '../business_logic/services/ExampleService';
import AuthorService from '../business_logic/services/AuthorService';

import ExampleRepository from '../data_access/repositories/ExampleRepository';
import AuthorRepository from '../data_access/repositories/AuthorRepository';

export default async function buildServices() {
  const dependencies = {
    example: new ExampleRepository(),
    author: new AuthorRepository(),
  };

  return {
    example: new ExampleService(_.pick(dependencies, ['example'])),
    author: new AuthorService(_.pick(dependencies, ['author'])),
  };
}
