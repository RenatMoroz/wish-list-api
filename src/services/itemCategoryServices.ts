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

export const getItemCategory = async (params: GetItemParamsCategory) => {
  const item = await ItemCollection.find(params);
  return item;
};

export const getItemCategoryId = async (id: string) => {
  const item = await ItemCollection.findById(id);
  return item;
};

export const updateItemCategory = async (
  id: string,
  body: UpdateItemCategory,
) => {
  const item = await ItemCollection.findByIdAndUpdate(id, body, { new: true });
  return item;
};

export const deleteItemCategory = async (id: string) => {
  const item = await ItemCollection.findByIdAndDelete(id);
  return item;
};
