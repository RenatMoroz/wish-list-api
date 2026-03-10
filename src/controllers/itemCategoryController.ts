import { RequestHandler } from 'express';
import { UserDocument } from '../database/models/user.js';
import * as itemServices from '../services/itemCategoryServices.js';
import {
  CreateItemCategory,
  UpdateItemCategory,
} from '../types/itemCategory.js';
import createHttpError from 'http-errors';

export const createItemCategory: RequestHandler = async (req, res, next) => {
  const body = req.body as CreateItemCategory;
  const user = req.user as UserDocument;

  if (user?._id) {
    body.userId = user._id.toString();
  }

  const item = await itemServices.createItemCategory(body);

  res.status(201).json(item);
};

export const getItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const filters = req.query;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const items = await itemServices.getItemCategory(filters, user._id);

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemCategoryId: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const item = await itemServices.getItemCategoryId(itemCategoryId, user._id);

    if (!item) {
      return next(createHttpError(404, 'Item not found'));
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const body = req.body as UpdateItemCategory;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const item = await itemServices.updateItemCategory(
      itemCategoryId,
      user._id,
      body,
    );

    if (!item) {
      return next(createHttpError(404, 'Item not found'));
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const deletedItem = await itemServices.deleteItemCategory(
      itemCategoryId,
      user._id,
    );

    if (!deletedItem) {
      return next(createHttpError(404, 'Item not found'));
    }

    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    next(error);
  }
};
