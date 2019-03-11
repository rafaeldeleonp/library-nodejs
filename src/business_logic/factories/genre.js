import Joi from 'joi';
import {getIdFromObject} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId(),
  key: Joi.string(),
  name: Joi.string(),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    key: params.key,
    name: params.name,
  };

  return doc;
}