import Joi from 'joi';
import {getIdFromObject} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId().required(),
  first_name: Joi.string().min(3).max(25),
  last_name: Joi.string().min(3).max(25),
  born: Joi.string().isoDate(),
  died: Joi.string().isoDate(),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    first_name: params.first_name,
    last_name: params.last_name,
    born: params.born,
    died: params.died,
  };

  return doc;
}