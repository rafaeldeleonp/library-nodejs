import _ from 'lodash';

import ExampleService from '../business_logic/services/ExampleService';
import AuthorService from '../business_logic/services/AuthorService';
import GenreService from '../business_logic/services/GenreService';
import PageService from '../business_logic/services/PageService';

import ExampleRepository from '../data_access/repositories/ExampleRepository';
import AuthorRepository from '../data_access/repositories/AuthorRepository';
import GenreRepository from '../data_access/repositories/GenreRepository';
import PageRepository from '../data_access/repositories/PageRepository';

export default async function buildServices() {
  const dependencies = {
    example: new ExampleRepository(),
    author: new AuthorRepository(),
    genre: new GenreRepository(),
    page: new PageRepository(),
  };

  return {
    example: new ExampleService(_.pick(dependencies, ['example'])),
    author: new AuthorService(_.pick(dependencies, ['author'])),
    genre: new GenreService(_.pick(dependencies, ['genre'])),
    page: new PageService(_.pick(dependencies, ['page'])),
  };
}
