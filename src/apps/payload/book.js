import {PROPS} from '../../business_logic/factories/book';

export const create = (Joi) => {
  return Joi.object().keys({
    ISBN: PROPS.ISBN.required(),
    title: PROPS.title.required(),
    summary: PROPS.summary.required(),
    authors: PROPS.authors.required(),
    genres: PROPS.genres.required(),
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    title: PROPS.title,
    summary: PROPS.summary,
    authors: PROPS.authors,
    genres: PROPS.genres,
  });
};