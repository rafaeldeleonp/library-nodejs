import normalizer from '../../business_logic/factories/normalizer';
import MongoBase from './MongoBase';

class PageRepository extends MongoBase {

  entity = 'page';

  constructor() {
    super();
    this.model = this.buildModel('Page');
  }

  @normalizer()
  async getOne(query) {
    this.transformId(query);
    return this.model.findOne(query).exec();
  }

  @normalizer()
  async getMany() {
    return this.model.find().exec();
  }

  @normalizer()
  async count(query) {
    return this.model.count(query).exec();
  }

  @normalizer()
  async create(params) {
    let document;

    try {
      document = await this.model.create(params);
    } catch (e) {
      this.throwError(e, params);
    }

    return document;
  }

  @normalizer()
  async update(id, params) {
    let document;

    try {
      document = await this.model.findByIdAndUpdate(id, params, {new: true});
    } catch (e) {
      this.throwError(e, params);
    }

    return document;
  }
}

export default PageRepository;
