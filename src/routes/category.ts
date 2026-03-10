import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as itemController from '../controllers/itemCategoryController.js';
import {
  categoryIdSchema,
  createCategorySchema,
  getAllCategorySchema,
  updateCategorySchema,
} from '../validations/categoryValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post(
  '/',
  celebrate(createCategorySchema),
  authenticate,
  categoryController.createWishListCategory,
);
router.get(
  '/',
  authenticate,
  celebrate(getAllCategorySchema),
  categoryController.getWishListCategory,
);
router.get(
  '/:categoryId',
  celebrate(categoryIdSchema),
  authenticate,
  categoryController.getWishListCategoryId,
);
router.get(
  '/:categoryId/items',
  celebrate(categoryIdSchema),
  authenticate,
  itemController.getItemCategory,
);
router.patch(
  '/:categoryId',
  celebrate(updateCategorySchema),
  authenticate,
  categoryController.updateWishListCategory,
);
router.delete(
  '/:categoryId',
  celebrate(categoryIdSchema),
  authenticate,
  categoryController.deleteWishListCategory,
);
export default router;
