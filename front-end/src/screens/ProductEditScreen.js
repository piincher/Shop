import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ image, setImage ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ countInStock, setCountInStock ] = useState(0);
	const [ description, setDescription ] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(
		() => {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.email);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		},
		[ dispatch, history, productId, product ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		// update product
	};

	return (
		<div>
			<Link to="/admin/product" className="btn btn-dark my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit product</h1>

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>price </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>image </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="Brand">
							<Form.Label>Brand </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="CountInStock">
							<Form.Label>CountInStock </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter ContInStock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="Category">
							<Form.Label>Category </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Category "
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="Description">
							<Form.Label>Description </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Description "
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</div>
	);
};

export default ProductEditScreen;
