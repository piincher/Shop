import express from 'express';

const router = express.Router();
import { addOrderItems, getOrderByid, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderByid);
router.route('/:id/pay').get(protect, updateOrderToPaid);

export default router;
