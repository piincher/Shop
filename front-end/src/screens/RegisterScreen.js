import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {
	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ message, setMessage ] = useState(null);
	const redirect = location.search ? location.search.split('=')[1] : '/';
	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;
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
		if (password !== confirmPassword) {
			setMessage('le mot de passe ne correspond pas');
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<FormContainer>
			<h1>S'INSCRIRE</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						placeHolder="enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeHolder="enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeHolder="enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="ConfirmPassword">
					<Form.Label>ConfirmPassword</Form.Label>
					<Form.Control
						type="password"
						placeHolder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					S'INSCRIRE
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					AVEZ-vous déjà un Compte ?
					<Link to={redirect ? `/login?login=${redirect}` : '/login'}> Se connecter </Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
export default RegisterScreen;
