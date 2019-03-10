import {getLogger} from '../../utils/helper';

class Service {

  _entity = 'Service';

  get entity() {
    return this._entity;
  }

  get log() {
    return getLogger(this.entity);
  }
}

export default Service;
