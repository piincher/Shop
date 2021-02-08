import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

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

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
