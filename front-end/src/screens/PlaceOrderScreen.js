import React, { useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart);
	let { shippingAddress, paymentMethod, cartItems, totalPrice, shippingPrice, taxPrice, itemsPrice } = cart;
	//calcul
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	shippingPrice = itemsPrice > 100 ? 0 : 100;

	taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

	totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

	const placeOrderHandler = () => {
		console.log('order');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default PlaceOrderScreen;
