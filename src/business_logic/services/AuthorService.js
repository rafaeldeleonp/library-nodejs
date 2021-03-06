import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import EntityDuplicatedError from '../exceptions/EntityDuplicatedError';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/author';
import AuthorRepository from '../../data_access/repositories/AuthorRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const authorRepositorySchema = Joi.object()
  .type(AuthorRepository, 'AuthorRepository')
  .error(new MissingDependenciesError('AuthorRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  author: authorRepositorySchema,
}).unknown(true);

class AuthorService extends Service {
  _entity = 'author';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.author = dependencies.author;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const author = await this.author.getOne({id});

    if (!author) throw new RecordNotFoundException('author not found');

    return author;
  }

  @normalizer({serializer: normalizeService})
  async getMany() {
    return this.author.getMany();
  }

  @normalizer({serializer: normalizeService})
  async create(params) {
    const schema = Joi.object().keys({
      first_name: PROPS.first_name.required(),
      last_name: PROPS.last_name.required(),
      born: PROPS.born.required(),
      died: PROPS.died,
    });

    const data = validateSchema(params, schema);

    const find = await this.author.getOne({first_name: params.first_name, last_name: params.last_name});
    if (find) throw new EntityDuplicatedError('Author', `${params.first_name} ${params.last_name}`);

    return this.author.create(data);
  }

  @normalizer({serializer: normalizeService})
  async update(id, params) {
    validateSchema(id, PROPS.id.required());

    const schema = Joi.object().keys({
      first_name: PROPS.first_name,
      last_name: PROPS.last_name,
      born: PROPS.born,
      died: PROPS.died,
    });

    const data = validateSchema(params, schema);

    return this.author.update(id, data);
  }
}

export default AuthorService;