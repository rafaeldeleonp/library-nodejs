import {PROPS} from '../../business_logic/factories/author';

export const read = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id,
  });
};