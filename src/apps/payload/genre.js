import {PROPS} from '../../business_logic/factories/genre';

export const create = (Joi) => {
  return Joi.object().keys({
    key: PROPS.key.required(),
    name: PROPS.name.required(),
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    key: PROPS.key,
    name: PROPS.name,
  });
};