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

export const getWishListCategory = async (params: GetCategoryParams = {}) => {
  const items = await CategoryCollection.find(params);
  return items;
};

export const getWishListCategoryId = async (id: string) => {
  const item = await CategoryCollection.findById(id);
  return item;
};

export const updateWishListCategory = async (
  id: string,
  body: UpdateCategory,
) => {
  const item = await CategoryCollection.findByIdAndUpdate(id, body);
  return item;
};

export const deleteWishListCategory = async (id: string) => {
  const item = await CategoryCollection.findByIdAndDelete(id);
  return item;
};
