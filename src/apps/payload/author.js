import {PROPS} from '../../business_logic/factories/author';

export const create = (Joi) => {
  return Joi.object().keys({
    key: PROPS.key.required(),
    first_name: PROPS.first_name.required(),
    last_name: PROPS.last_name.required(),
    birth_date: PROPS.birth_date.required(),
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    first_name: PROPS.first_name,
    last_name: PROPS.last_name,
    birth_date: PROPS.birth_date,
  });
};