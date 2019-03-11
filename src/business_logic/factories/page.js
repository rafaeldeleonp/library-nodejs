import Joi from 'joi';
import {getIdFromObject, getObjectId} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId(),
  book_id: Joi.objectId(),
  content: Joi.string(),
  number: Joi.number(),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    book_id: getObjectId(params.book_id, true),
    content: params.content,
    number: params.number,
  };

  return doc;
}