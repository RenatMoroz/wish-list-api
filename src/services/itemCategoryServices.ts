import { Types } from 'mongoose';
import { ItemCollection } from '../database/models/itemCategory.js';
import {
  CreateItemCategory,
  GetItemParamsCategory,
  UpdateItemCategory,
} from '../types/itemCategory.js';

export const createItemCategory = async (body: CreateItemCategory) => {
  const item = await ItemCollection.create(body);
  return item;
};

export const getItemCategory = async (
  params: GetItemParamsCategory = {},
  userId: Types.ObjectId,
) => {
  const query: any = {
    userId: userId.toString(),
  };

  if (params.title) {
    query.title = params.title;
  }

  if (params.description) {
    query.description = params.description;
  }

  if (params.categoryId) {
    query.categoryId = params.categoryId;
  }

  const items = await ItemCollection.find(query);

  return items;
};

export const getItemCategoryId = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
) => {
  const item = await ItemCollection.findOne({
    _id: itemCategoryId,
    userId: userId.toString(),
  });

  return item;
};

export const updateItemCategory = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
  body: UpdateItemCategory,
) => {
  const item = await ItemCollection.findOne({
    _id: itemCategoryId,
    userId: userId.toString(),
  });

  if (!item) return null;

  if (body.title !== undefined) item.title = body.title;

  if (body.description !== undefined) item.description = body.description;

  if (body.categoryId !== undefined) {
    item.categoryId = new Types.ObjectId(body.categoryId);
  }

  await item.save();

  return item;
};

export const deleteItemCategory = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
) => {
  const item = await ItemCollection.findOneAndDelete({
    _id: itemCategoryId,
    userId: userId.toString(),
  });

  return item;
};
