import { Router } from 'express';
import * as itemController from '../controllers/itemCategoryController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/', authenticate, itemController.createItemCategory);
router.get('/', authenticate, itemController.getItemCategory);
router.get('/:itemCategoryId', authenticate, itemController.getItemCategoryId);
router.patch(
  '/:itemCategoryId',
  authenticate,
  itemController.updateItemCategory,
);
router.delete(
  '/:itemCategoryId',
  authenticate,
  itemController.deleteItemCategory,
);

export default router;
