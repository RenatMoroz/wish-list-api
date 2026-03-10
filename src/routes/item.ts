import { Router } from 'express';
import * as itemController from '../controllers/itemCategoryController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { celebrate } from 'celebrate';
import {
  createItemSchema,
  getAllItemSchema,
  getIdItemSchema,
  updateItemSchema,
} from '../validations/itemValidation.js';

const router = Router();

router.post(
  '/',
  authenticate,
  celebrate(createItemSchema),
  itemController.createItemCategory,
);
router.get(
  '/',
  celebrate(getAllItemSchema),
  authenticate,
  itemController.getItemCategory,
);
router.get(
  '/:itemCategoryId',
  celebrate(getIdItemSchema),
  authenticate,
  itemController.getItemCategoryId,
);
router.patch(
  '/:itemCategoryId',
  celebrate(updateItemSchema),
  authenticate,
  itemController.updateItemCategory,
);
router.delete(
  '/:itemCategoryId',
  celebrate(getIdItemSchema),
  authenticate,
  itemController.deleteItemCategory,
);

export default router;
