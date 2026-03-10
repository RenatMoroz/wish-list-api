import { RequestHandler } from 'express';
import * as categoryServices from '../services/categoryServices.js';
import { CreateCategory, UpdateCategory } from '../types/category.js';
import { UserDocument } from '../database/models/user.js';

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
    const filters = req.query;
    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const categories = await categoryServices.getWishListCategory(
      filters,
      user._id,
    );

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getWishListCategoryId: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const category = await categoryServices.getWishListCategoryId(
      categoryId,
      user._id,
    );

    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
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

    const category = await categoryServices.updateWishListCategory(
      categoryId,
      user._id,
      body,
    );

    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }

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

    const deletedCategory = await categoryServices.deleteWishListCategory(
      categoryId,
      user._id,
    );

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
