import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ message, setMessage ] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				if (!user || !user.name || success) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET });
					dispatch(getUserDetails('profile'));
					dispatch(listMyOrders());
				} else {
					setName(user.name);
					setEmail(user.email);
				}
			}
		},
		[ dispatch, history, userInfo, user, success ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Le mot de passe ne correspond pas');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>Profil D'utilisateur</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="name"
							placeholder="Entre Nom"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Addresse Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Entre l'email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control
							type="password"
							placeholder="Entre le mot de passe"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirmer Le Mot de passe</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirmer le mot de passe"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					<Button type="submit" variant="primary">
						Mettre à jour
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Mes Commandes</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAYÉ</th>
								<th>DELIVRÉ</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice} FCFA</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }} />
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }} />
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
