import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/book';
import BookRepository from '../../data_access/repositories/BookRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const bookRepositorySchema = Joi.object()
  .type(BookRepository, 'BookRepository')
  .error(new MissingDependenciesError('BookRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  book: bookRepositorySchema,
}).unknown(true);

class BookService extends Service {
  _entity = 'book';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.book = dependencies.book;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const book = await this.book.getOne({id});

    if (!book) throw new RecordNotFoundException('book not found');

    return book;
  }

  @normalizer({serializer: normalizeService})
  async getMany() {
    return this.book.getMany();
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

    return await this.book.create(data);
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

    return await this.book.update(id, data);
  }
}

export default BookService;