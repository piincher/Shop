import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

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

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;
	useEffect(
		() => {
			if (success) {
				history.push(`/order/${order._id}`);
			}
			// eslint-disable-next-line
		},
		[ history, success, order ]
	);
	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice
			})
		);
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Addresse de Livraison</h2>
							<p>
								<strong>Addresse:</strong>
								{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Mode de paiement</h2>
							<strong>Mode: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Articles Commandés</h2>
							{cartItems.length === 0 ? (
								<Message>Votre Panier est vide</Message>
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
													{item.qty} x {item.price} FCFA= {item.qty * item.price} FCFA
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
								<h2>Récaptulatif de la commande </h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Articles</Col>
									<Col>{itemsPrice} FCFA</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col> frais livraison</Col>
									<Col>{shippingPrice} FCFA</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxe</Col>
									<Col>{taxPrice} FCFA</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{totalPrice} FCFA</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
									Passer la commande
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
