import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as itemController from '../controllers/itemCategoryController.js';

const router = Router();

router.post('/', authenticate, categoryController.createWishListCategory);
router.get('/', authenticate, categoryController.getWishListCategory);
router.get(
  '/:categoryId',
  authenticate,
  categoryController.getWishListCategoryId,
);
router.get('/:categoryId/items', authenticate, itemController.getItemCategory);
router.patch(
  '/:categoryId',
  authenticate,
  categoryController.updateWishListCategory,
);
router.delete(
  '/:categoryId',
  authenticate,
  categoryController.deleteWishListCategory,
);
export default router;
