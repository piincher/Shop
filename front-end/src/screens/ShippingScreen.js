import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
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
			<CheckoutSteps step1 step2 />
			<h2>Addresse de livraison</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="adress">
					<Form.Label>Adresse</Form.Label>
					<Form.Control
						type="text"
						placeholder="entre votre adresse"
						required
						value={address}
						onChange={(e) => setAdress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>Ville</Form.Label>
					<Form.Control
						type="text"
						placeHolder="Votre Ville"
						required
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>Code Postal</Form.Label>
					<Form.Control
						type="text"
						placeHolder="entre votre Code Postal"
						required
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Pays</Form.Label>
					<Form.Control
						type="text"
						placeHolder="pays"
						required
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Suivant
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
