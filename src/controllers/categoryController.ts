import { RequestHandler } from 'express';
import * as categoryServices from '../services/categoryServices.js';
import { CreateCategory, UpdateCategory } from '../types/category.js';
import { UserDocument } from '../database/models/user.js';
import { CategoryCollection } from '../database/models/category.js';
import createHttpError from 'http-errors';

export const createWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  const body = req.body as CreateCategory;
  const user = req.user as UserDocument;
  if (user?._id) {
    body.userId = user._id.toString();
  }

  const item = await categoryServices.createWishListCategory(body);
  return res.status(201).json(item);
};

export const getWishListCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const categories = await CategoryCollection.find({
      userId: user._id,
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getWishListCategoryId: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;
    if (!user._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const category = await CategoryCollection.findOne({
      _id: categoryId,
      userId: user._id.toString(),
    });
    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { categoryId } = req.params;
    const body = req.body as UpdateCategory;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const category = await CategoryCollection.findOne({
      _id: categoryId,
      userId: user._id.toString(),
    });

    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }

    if (body.title !== undefined) category.title = body.title;
    if (body.description !== undefined) category.description = body.description;
    if (body.background !== undefined) category.background = body.background;

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const deletedCategory = await CategoryCollection.findOneAndDelete({
      _id: categoryId,
      userId: user._id,
    });

    if (!deletedCategory) {
      return next(createHttpError(404, 'Category not found'));
    }

    res
      .status(200)
      .json({ message: 'Category deleted successfully', deletedCategory });
  } catch (err) {
    next(err);
  }
};
