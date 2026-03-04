import { Router } from 'express';
import authRouter from './auth.js';
import categoryRouter from './category.js';
import itemRouter from './item.js';
const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/item', itemRouter);
export default router;
