import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const objecIdValidator = (
  value: any,
  helpers: Joi.CustomHelpers<any>,
) => {
  return isValidObjectId(value) ? value : helpers.error('any.invalid');
};

export const createCategorySchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    background: Joi.string().default('white'),
  }),
};

export const getAllCategorySchema = {
  [Segments.QUERY]: {
    title: Joi.string(),
    description: Joi.string(),
    background: Joi.string(),
  },
};

export const categoryIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    categoryId: Joi.string().custom(objecIdValidator).required(),
  }),
};

export const updateCategorySchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    background: Joi.string(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    categoryId: Joi.string().custom(objecIdValidator).required(),
  }),
};
