import {PROPS} from '../../business_logic/factories/book';

export const read = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
  });
};

export const readBookPage = (Joi) => {
  return Joi.object().keys({
    id: PROPS.id.required(),
    number: Joi.number().required(),
    format: Joi.string().required(),
  });
};