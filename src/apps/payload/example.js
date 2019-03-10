import {PROPS} from '../../business_logic/factories/example';

export const create = (Joi) => {
  return Joi.object().keys({
    name: PROPS.name.required(),
    description: PROPS.description.required(),
  });
};

export const update = (Joi) => {
  return Joi.object().keys({
    name: PROPS.name,
    description: PROPS.description,
  });
};