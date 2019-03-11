import {PROPS} from '../../business_logic/factories/page';

export const create = (Joi) => {
  return Joi.object().keys({
    key: PROPS.key.required(),
    book_id: PROPS.book_id.required(),
    content: PROPS.content.required(),
    number: PROPS.number.required(),
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    key: PROPS.key,
    book_id: PROPS.book_id,
    content: PROPS.content,
    number: PROPS.number,
  });
};