import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);

	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}
	const [ paymentMethod, setPaymentMethod ] = useState('Paypal');
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />

			<h2>Mode de paiement</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend"> Selectionner la méthode </Form.Label>

					<Col>
						<Form.Check
							type="radio"
							label="Paypal ou carte de crédit"
							id="Paypal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						{/* <Form.Check
							type="radio"
							label="Orange Money"
							id="Orange Money"
							name="paymentMethod"
							value="Orange Money"
							onChange={(e) => setPaymentMethod(e.target.value)}
						/> */}
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Suivant
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
