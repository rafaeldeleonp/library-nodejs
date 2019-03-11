import _ from 'lodash';

import ExampleService from '../business_logic/services/ExampleService';
import AuthorService from '../business_logic/services/AuthorService';
import BookService from '../business_logic/services/BookService';
import GenreService from '../business_logic/services/GenreService';
import PageService from '../business_logic/services/PageService';

import ExampleRepository from '../data_access/repositories/ExampleRepository';
import AuthorRepository from '../data_access/repositories/AuthorRepository';
import BookRepository from '../data_access/repositories/BookRepository';
import GenreRepository from '../data_access/repositories/GenreRepository';
import PageRepository from '../data_access/repositories/PageRepository';

export default async function buildServices() {
  const dependencies = {
    example: new ExampleRepository(),
    author: new AuthorRepository(),
    book: new BookRepository(),
    genre: new GenreRepository(),
    page: new PageRepository(),
  };

  return {
    example: new ExampleService(_.pick(dependencies, ['example'])),
    author: new AuthorService(_.pick(dependencies, ['author'])),
    book: new BookService(_.pick(dependencies, ['book'])),
    genre: new GenreService(_.pick(dependencies, ['genre'])),
    page: new PageService(_.pick(dependencies, ['page'])),
  };
}
