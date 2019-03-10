import Joi from 'joi';
import {getIdFromObject} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId(),
  name: Joi.string(),
  description: Joi.string(),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    name: params.name || '',
    description: params.description || '',
  };

  return doc;
}