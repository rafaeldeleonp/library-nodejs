import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import EntityDuplicatedError from '../exceptions/EntityDuplicatedError';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/genre';
import GenreRepository from '../../data_access/repositories/GenreRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const genreRepositorySchema = Joi.object()
  .type(GenreRepository, 'GenreRepository')
  .error(new MissingDependenciesError('GenreRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  genre: genreRepositorySchema,
}).unknown(true);

class GenreService extends Service {
  _entity = 'genre';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.genre = dependencies.genre;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const genre = await this.genre.getOne({id});

    if (!genre) throw new RecordNotFoundException('genre not found');

    return genre;
  }

  @normalizer({serializer: normalizeService})
  async getMany() {
    return this.genre.getMany();
  }

  @normalizer({serializer: normalizeService})
  async create(params) {
    const schema = Joi.object().keys({
      name: PROPS.name.required(),
      description: PROPS.description,
    });

    const data = validateSchema(params, schema);

    const find = await this.genre.getOne({name: params.name});
    if (find) throw new EntityDuplicatedError('Genre', `${params.name}`);

    return this.genre.create(data);
  }

  @normalizer({serializer: normalizeService})
  async update(id, params) {
    validateSchema(id, PROPS.id.required());

    const schema = Joi.object().keys({
      name: PROPS.name,
      description: PROPS.description,
    });

    const data = validateSchema(params, schema);

    return this.genre.update(id, data);
  }
}

export default GenreService;