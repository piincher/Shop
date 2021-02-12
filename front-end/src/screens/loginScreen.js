import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const redirect = location.search ? location.search.split('=')[1] : '/';
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo, loading, error } = userLogin;
	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect);
			}
		},
		[ history, userInfo, redirect ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		// Dispatth login
		dispatch(login(email, password));
	};
	return (
		<FormContainer>
			<h1>Se Connecter</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label> Addresse Email</Form.Label>
					<Form.Control
						type="email"
						placeHolder="entre email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Mot de passe</Form.Label>
					<Form.Control
						type="password"
						placeHolder="entre Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					se connecter
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Nouveau Client ?
					<Link to={redirect ? `/register?redirect=${redirect}` : '/redirect'}> S'inscrire </Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
export default LoginScreen;
