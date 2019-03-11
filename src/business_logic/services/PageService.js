import Service from './Base';
import Joi from 'joi';
import omit from 'lodash/omit';
import appRootDir from 'app-root-dir';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import normalizer from '../factories/normalizer';
import normalizeService, {PROPS} from '../factories/page';
import PageRepository from '../../data_access/repositories/PageRepository';
import {validateSchema} from '../../utils/helper';
import {HTML} from '../../constants';
import MissingDependenciesError from '../exceptions/MissingDependenciesError';
import RecordNotFoundException from '../exceptions/RecordNotFoundException';

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
      format: PROPS.format,
    });

    const data = validateSchema(params, schema);

    const page = await this.page.getOne(omit(data, ['format']));
    let content = '';

    if (data.format === HTML) {
      const tplPath = path.resolve(path.join(appRootDir.get(), 'src', 'template.html'));
      const tplFile = fs.readFileSync(tplPath);
      let template = Handlebars.compile(tplFile.toString());
      content = template({content: page.content});
    }

    if (!page) throw new RecordNotFoundException('page not found');

    return {
      ...page,
      content: data.format === HTML ? content : page.content,
    };
  }

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