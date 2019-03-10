import _ from 'lodash';
import mongoose from 'mongoose';
import JQL from 'jsonquerylanguage';
import BadParamsError from '../../business_logic/exceptions/BadParamsError';
import InternalError from '../../business_logic/exceptions/InternalError';
import UnknownError from '../../business_logic/exceptions/UnknownError';
import EntityDuplicatedError from '../../business_logic/exceptions/EntityDuplicatedError';
import {getLogger, getObjectId} from '../../utils/helper';

class MongoBase {

  entity = 'BaseModel';

  _model = null;

  get log() {
    return getLogger(this.entity);
  }

  get model() {
    return this._model;
  }

  set model(model) {
    if (this._model) throw new InternalError('could not override model value.');
    this._model = model;
  }

  constructor() {
    this._jql = new JQL();
  }

  isId(val) {
    return mongoose.Types.ObjectId.isValid(val);
  }

  buildModel(model) {
    return mongoose.model(model);
  }

  transformId(query) {
    if (!query.id) return query;
    query._id = this.isId(query.id) ? mongoose.Types.ObjectId(query.id) : query.id;
    delete query.id;
    return query;
  }

  toIn(query, targets = ['_id']) {
    targets.forEach((k) => {
      if (!_.isArray(query[k])) {
        if (_.isEmpty(query[k])) return query;
        query[k] = getObjectId(query[k]);
        return query;
      }
      query[k] = {
        '$in': query[k].map((v) => getObjectId(v, false)), // if valid ObjectId string will be transformed otherwise return value as is.
      };
    });

    return query;
  }

  throwError(error, params = {}) {
    if (error.name === mongoose.Error.ValidationError.name) { // because if are different monsoose version could fail.
      const result = this.jql.searchAndGetPaths(error.errors, '$.*.[?(@.kind == \'unique\')]');
      if (result && result.length > 0) { // has unique error
        throw new EntityDuplicatedError(params.entity || this.entity, result);
      }
      throw new BadParamsError(error, error.errors);
    }
    throw new UnknownError(error.message, error);
  }
}

export default MongoBase;
