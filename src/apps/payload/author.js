import {PROPS} from '../../business_logic/factories/author';

export const create = (Joi) => {
  return Joi.object().keys({
    first_name: PROPS.first_name.required(),
    last_name: PROPS.last_name.required(),
    born: PROPS.born.required(),
    died: PROPS.died,
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    first_name: PROPS.first_name,
    last_name: PROPS.last_name,
    born: PROPS.born,
    died: PROPS.died,
  });
};