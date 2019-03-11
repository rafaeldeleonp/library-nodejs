import Joi from 'joi';
import {getIdFromObject, getObjectIds} from '../../utils/helper';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);

export const PROPS = {
  id: Joi.objectId(),
  ISBN: Joi.string().length(13),
  title: Joi.string().min(3).max(30),
  summary: Joi.string(),
  authors: Joi.array().items(Joi.objectId()).min(1),
  genres: Joi.array().items(Joi.objectId()).min(1),
};

export default function normalizeService(params) {
  const doc = {
    id: getIdFromObject(params),
    ISBN: params.ISBN,
    title: params.title,
    summary: params.summary || '',
    authors: getObjectIds(params.authors || []),
    genres: getObjectIds(params.genres || []),
    pages: params.pages,
  };

  return doc;
}