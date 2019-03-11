import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/book';
import BookRepository from '../../data_access/repositories/BookRepository';
import PageRepository from '../../data_access/repositories/PageRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const bookRepositorySchema = Joi.object()
  .type(BookRepository, 'BookRepository')
  .error(new MissingDependenciesError('BookRepository'))
  .required();

const pageRepositorySchema = Joi.object()
  .type(PageRepository, 'PageRepository')
  .error(new MissingDependenciesError('PageRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  book: bookRepositorySchema,
  page: pageRepositorySchema,
}).unknown(true);

class BookService extends Service {
  _entity = 'book';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.book = dependencies.book;
    this.page = dependencies.page;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const book = await this.book.getOne({id});

    if (!book) throw new RecordNotFoundException('book not found');

    const pagesNumber = await this.page.count({book_id: id});

    return {
      ...book,
      pages: pagesNumber,
    };
  }

  @normalizer({serializer: normalizeService})
  async getMany() {

    const books = await this.book.getMany();

    return books;
  }

  @normalizer({serializer: normalizeService})
  async create(params) {
    const schema = Joi.object().keys({
      ISBN: PROPS.ISBN.required(),
      title: PROPS.title.required(),
      summary: PROPS.summary,
      authors: PROPS.authors.required(),
      genres: PROPS.genres.required(),
    });

    const data = validateSchema(params, schema);

    return this.book.create(data);
  }

  @normalizer({serializer: normalizeService})
  async update(id, params) {
    validateSchema(id, PROPS.id.required());

    const schema = Joi.object().keys({
      title: PROPS.title,
      summary: PROPS.summary,
      authors: PROPS.authors,
      genres: PROPS.genres,
    });

    const data = validateSchema(params, schema);

    return this.book.update(id, data);
  }
}

export default BookService;