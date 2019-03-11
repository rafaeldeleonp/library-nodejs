import {PROPS} from '../../business_logic/factories/genre';

export const read = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
  });
};