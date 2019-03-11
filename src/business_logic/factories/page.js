import Joi from 'joi';
import {getIdFromObject, getObjectId} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId(),
  key: Joi.string(),
  book_id: Joi.objectId(),
  content: Joi.string(),
  number: Joi.number(),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    key: params.key,
    book_id: getObjectId(params.bookd_id, true),
    content: params.content,
    number: params.number,
  };

  return doc;
}