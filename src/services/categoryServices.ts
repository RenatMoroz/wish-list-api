import { Types } from 'mongoose';
import { CategoryCollection } from '../database/models/category.js';
import {
  CreateCategory,
  GetCategoryParams,
  UpdateCategory,
} from '../types/category.js';

export const createWishListCategory = async (body: CreateCategory) => {
  const item = await CategoryCollection.create(body);
  return item;
};

export const getWishListCategory = async (
  params: GetCategoryParams = {},
  _id: Types.ObjectId,
) => {
  const query: GetCategoryParams = {
    userId: _id.toString(),
  };
  if (params.title) {
    query.title = params.title;
  }
  if (params.background) {
    query.background = params.background;
  }
  if (params.description) {
    query.description = params.description;
  }
  const items = await CategoryCollection.find(query);
  return items;
};

export const getWishListCategoryId = async (
  categoryId: string,
  userId: Types.ObjectId,
) => {
  const category = await CategoryCollection.findOne({
    _id: categoryId,
    userId: userId.toString(),
  });

  return category;
};

export const updateWishListCategory = async (
  categoryId: string,
  userId: Types.ObjectId,
  body: UpdateCategory,
) => {
  const category = await CategoryCollection.findOne({
    _id: categoryId,
    userId: userId.toString(),
  });

  if (!category) return null;

  if (body.title !== undefined) category.title = body.title;
  if (body.description !== undefined) category.description = body.description;
  if (body.background !== undefined) category.background = body.background;

  await category.save();

  return category;
};
export const deleteWishListCategory = async (
  categoryId: string,
  userId: Types.ObjectId,
) => {
  const deletedCategory = await CategoryCollection.findOneAndDelete({
    _id: categoryId,
    userId: userId.toString(),
  });

  return deletedCategory;
};
