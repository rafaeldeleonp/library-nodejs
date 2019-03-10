import normalizer from '../../business_logic/factories/normalizer';
import MongoBase from './MongoBase';

class ExampleRepository extends MongoBase {

  entity = 'example';

  constructor() {
    super();
    this.model = this.buildModel('Example');
  }

  @normalizer()
  async getOne(query) {
    this.transformId(query);
    return await this.model.findOne(query).exec();
  }

  @normalizer()
  async getMany() {
    return await this.model.find().exec();
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

export default ExampleRepository;
