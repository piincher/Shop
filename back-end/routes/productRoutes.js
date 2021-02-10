import express from 'express';
const router = express.Router();
import {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	createdProductReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createdProductReview);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router;
