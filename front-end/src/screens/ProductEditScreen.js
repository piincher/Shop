import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ image, setImage ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ countInStock, setCountInStock ] = useState(0);
	const [ description, setDescription ] = useState('');
	const [ uploading, setUploading ] = useState(false);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

	useEffect(
		() => {
			if (successUpdate) {
				dispatch({ type: PRODUCT_UPDATE_RESET });
				history.push('/admin/productlist');
			} else {
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
			}
		},
		[ dispatch, history, productId, product, successUpdate ]
	);
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const { data } = await axios.post('/api/upload', formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description
			})
		);
	};

	return (
		<div>
			<Link to="/admin/product" className="btn btn-dark my-3">
				retour
			</Link>
			<FormContainer>
				<h1>Ajouter/Modifier produit</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Nom</Form.Label>
							<Form.Control
								type="name"
								placeholder="Entre name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>PRIX</Form.Label>
							<Form.Control
								type="number"
								placeholder="Entre prix"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>image </Form.Label>
							<Form.Control
								type="text"
								placeholder="Entrer url de l'image"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
							<Form.File id="image-file" label="choisir un image" custom onChange={uploadFileHandler} />
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Marque </Form.Label>
							<Form.Control
								type="text"
								placeholder="Marque"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>Compter en Stock </Form.Label>
							<Form.Control
								type="number"
								placeholder="Compter en stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>CATEGORIE </Form.Label>
							<Form.Control
								type="text"
								placeholder="Categorie "
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description </Form.Label>
							<Form.Control
								type="text"
								placeholder="Description "
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Button type="submit" variant="primary">
							Ajoute/mettre à jour
						</Button>
					</Form>
				)}
			</FormContainer>
		</div>
	);
};

export default ProductEditScreen;
