import { Joi, Segments } from 'celebrate';
import { objecIdValidator } from './categoryValidation.js';

export const createItemSchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().custom(objecIdValidator).required(),
  }),
};

export const getAllItemSchema = {
  [Segments.QUERY]: {
    title: Joi.string(),
    description: Joi.string(),
    categoryId: Joi.string().custom(objecIdValidator).required(),
  },
};

export const getIdItemSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    categoryId: Joi.string().custom(objecIdValidator).required(),
  }),
};

export const updateItemSchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    categoryId: Joi.string().custom(objecIdValidator).required(),
  }),
};
