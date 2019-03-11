import {PROPS} from '../../business_logic/factories/book';
import {PROPS as PAGEPROPS} from '../../business_logic/factories/page';

export const read = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
  });
};

export const readBookPage = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
    number: Joi.number().required(),
    format: PAGEPROPS.format.required(),
  });
};