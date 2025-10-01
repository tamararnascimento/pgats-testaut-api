import express from 'express';
import purchaseService from '../service/purchaseService.js';
import authMiddleware from '../service/authMiddleware.js';

const router = express.Router();
router.post('/', authMiddleware, purchaseService.makePurchase);

export default router;
