import {PROPS} from '../../business_logic/factories/example';

export const read = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
  });
};