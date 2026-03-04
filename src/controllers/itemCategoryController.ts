import { RequestHandler } from 'express';
import { UserDocument } from '../database/models/user.js';
import * as categoryItemServices from '../services/itemCategoryServices.js';
import {
  CreateItemCategory,
  UpdateItemCategory,
} from '../types/itemCategory.js';
import createHttpError from 'http-errors';
import { ItemCollection } from '../database/models/itemCategory.js';
import { Types } from 'mongoose';

export const createItemCategory: RequestHandler = async (req, res, next) => {
  const body = req.body as CreateItemCategory;
  const user = req.user as UserDocument;
  if (user._id) {
    body.userId = user._id.toString();
  }
  const item = await categoryItemServices.createItemCategory(body);
  res.status(201).json(item);
};

export const getItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const { categoryId } = req.params;

    const filter: any = {
      userId: user._id,
    };

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const items = await ItemCollection.find(filter);

    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemCategoryId: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const user = req.user as UserDocument;
    if (!user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const itemCategory = await ItemCollection.findOne({
      _id: itemCategoryId,
      userId: user._id.toString(),
    });
    if (!itemCategory) {
      return next(createHttpError(404, 'Item not found'));
    }
    res.status(200).json(itemCategory);
  } catch (error) {
    next(error);
  }
};

export const updateItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const body = req.body as UpdateItemCategory;
    const user = req.user as UserDocument;
    if (!user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const itemCategory = await ItemCollection.findOne({
      _id: itemCategoryId,
      userId: user._id.toString(),
    });
    if (!itemCategory) {
      return next(createHttpError(404, 'Item not found'));
    }
    if (body.title !== undefined) itemCategory.title = body.title;
    if (body.description !== undefined)
      itemCategory.description = body.description;
    if (body.categoryId !== undefined)
      itemCategory.categoryId = new Types.ObjectId(body.categoryId);
    await itemCategory.save();
    res.status(200).json(itemCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const { itemCategoryId } = req.params;
    const user = req.user as UserDocument;
    if (!user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const deleteItem = await ItemCollection.findOneAndDelete({
      _id: itemCategoryId,
      userId: user._id,
    });
    if (!deleteItem) {
      return next(createHttpError(404, 'Item not found'));
    }
    res
      .status(200)
      .json({ message: 'Category deleted successfully', deleteItem });
  } catch (error) {
    next(error);
  }
};
