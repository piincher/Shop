import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new Order
// @route   POST  /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('no order Items ');
		return;
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			user: req.user._id,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// @desc    get Order By id
// @route   Get  /api/orders/:id
// @access  Private
const getOrderByid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('order not found ');
	}
});

// @desc    update order to paid
// @route   Get  /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address
		};

		const updateOrder = await order.save();
		res.json(updateOrder);
	} else {
		res.status(404);
		throw new Error('order not found ');
	}
});
export { addOrderItems, getOrderByid, updateOrderToPaid };
