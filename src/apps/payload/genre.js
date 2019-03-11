import {PROPS} from '../../business_logic/factories/genre';

export const create = (Joi) => {
  return Joi.object().keys({
    name: PROPS.name.required(),
    description: PROPS.description,
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    name: PROPS.name,
    description: PROPS.description,
  });
};