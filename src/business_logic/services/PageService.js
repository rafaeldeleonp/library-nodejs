import RecordNotFoundException from '../exceptions/RecordNotFoundException';
import normalizer from '../factories/normalizer';
import Service from './Base';
import Joi from 'joi';
import normalizeService, {PROPS} from '../factories/page';
import PageRepository from '../../data_access/repositories/PageRepository';
import {validateSchema} from '../../utils/helper';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';

const pageRepositorySchema = Joi.object()
  .type(PageRepository, 'PageRepository')
  .error(new MissingDependenciesError('PageRepository'))
  .required();

const dependenciesSchema = Joi.object().keys({
  page: pageRepositorySchema,
}).unknown(true);

class PageService extends Service {
  _entity = 'page';

  constructor(dependencies = {}) {
    super();

    validateSchema({
      ...dependencies,
    }, dependenciesSchema, false);

    this.page = dependencies.page;
  }

  @normalizer({serializer: normalizeService})
  async getById(id) {
    validateSchema(id, PROPS.id.required());

    const page = await this.page.getOne({id});

    if (!page) throw new RecordNotFoundException('page not found');

    return page;
  }

  @normalizer({serializer: normalizeService})
  async getOne(params) {
    const schema = Joi.object().keys({
      book_id: PROPS.book_id,
      number: PROPS.number,
    });

    const data = validateSchema(params, schema);

    const page = await this.page.getOne(data);

    if (!page) throw new RecordNotFoundException('page not found');

    return page;
  }

  async 

  @normalizer({serializer: normalizeService})
  async getMany() {
    return this.page.getMany();
  }

  @normalizer({serializer: normalizeService})
  async create(params) {
    const schema = Joi.object().keys({
      book_id: PROPS.book_id.required(),
      content: PROPS.content.required(),
      number: PROPS.number.required(),
    });

    const data = validateSchema(params, schema);

    return this.page.create(data);
  }

  @normalizer({serializer: normalizeService})
  async update(id, params) {
    validateSchema(id, PROPS.id.required());

    const schema = Joi.object().keys({
      book_id: PROPS.book_id,
      content: PROPS.content,
      number: PROPS.number,
    });

    const data = validateSchema(params, schema);

    return this.page.update(id, data);
  }
}

export default PageService;