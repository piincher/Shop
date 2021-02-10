import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products?
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i'
				}
			}
		: {};

	const products = await Product.find({ ...keyword });

	res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('produit indisponible');
	}
});

// @desc    delete single product
// @route   Delete /api/products/:id
// @access  private/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: ' produit enlever ' });
	} else {
		res.status(404);
		throw new Error('produit indisponible');
	}
});

// @desc    Create single product
// @route   POST /api/products
// @access  private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'sample product',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'sample brand',
		category: 'electromic',
		countInStock: 0,
		numReviews: 0,
		description: 'simple '
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    update product single product
// @route   PUT /api/products/:id
// @access  private/admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, category, image, countInStock, numReviews, description, brand } = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		(product.name = name),
			(product.price = price),
			(product.category = category),
			(product.image = image),
			(product.countInStock = countInStock),
			(product.numReviews = numReviews),
			(product.description = description),
			(product.brand = brand);

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('produit non trouver');
	}
});

// @desc    Create New Review
// @route   PUT /api/products/:id/reviews
// @access  private
const createdProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReview = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
		if (alreadyReview) {
			res.status(400);
			throw new Error('Produit déjà revu');
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
		await product.save();
		res.status(201).json({ message: 'Revu ajouté' });
	} else {
		res.status(404);
		throw new Error('produit non trouver');
	}
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createdProductReview };
