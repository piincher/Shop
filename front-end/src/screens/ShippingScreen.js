import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';
import FormContainer from '../components/FormContainer';
const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);

	const { shippingAddress } = cart;
	const [ address, setAdress ] = useState(shippingAddress.address);
	const [ city, setCity ] = useState(shippingAddress.city);
	const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
	const [ country, setCountry ] = useState(shippingAddress.country);
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<h2>shipping</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="adress">
					<Form.Label>Adress</Form.Label>
					<Form.Control
						type="text"
						placeHolder="enter adress"
						required
						value={address}
						onChange={(e) => setAdress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeHolder="enter City"
						required
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>PostalCode</Form.Label>
					<Form.Control
						type="text"
						placeHolder="enter postalCode"
						required
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeHolder="enter country"
						required
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Next
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
