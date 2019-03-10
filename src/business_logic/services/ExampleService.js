import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/example';
import ExampleRepository from '../../data_access/repositories/ExampleRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const exampleRepositorySchema = Joi.object()
  .type(ExampleRepository, 'ExampleRepository')
  .error(new MissingDependenciesError('ExampleRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  example: exampleRepositorySchema,
}).unknown(true);

class ExampleService extends Service {
  _entity = 'example';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.example = dependencies.example;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const example = await this.example.getOne({id});

    if (!example) throw new RecordNotFoundException('example not found');

    return example;
  }

  @normalizer({serializer: normalizeService})
  async getMany() {
    return this.example.getMany();
  }

  @normalizer({serializer: normalizeService})
  async create(params) {
    const schema = Joi.object().keys({
      name: PROPS.name.required(),
      description: PROPS.description.required(),
    });

    const data = validateSchema(params, schema);

    return await this.example.create(data);
  }

  @normalizer({serializer: normalizeService})
  async update(id, params) {
    validateSchema(id, PROPS.id.required());

    const schema = Joi.object().keys({
      name: PROPS.name,
      description: PROPS.description,
    });

    const data = validateSchema(params, schema);

    return await this.example.update(id, data);
  }
}

export default ExampleService;