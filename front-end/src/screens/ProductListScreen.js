import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct } from '../actions/productActions';
const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo && userInfo.isAdmin) {
				dispatch(listProducts());
			} else {
				history.push('/login');
			}
		},
		[ dispatch, history, userInfo, successDelete ]
	);
	const deleteHandler = (id) => {
		if (window.confirm("êtes-vous Sûr de vouloir supprimer l'utilisateur ?")) {
			dispatch(deleteProduct(id));
		}
	};
	const createProductHandler = () => {
		console.log('produc');
	};
	return (
		<div>
			<Row className="aligns-items-center">
				<Col>
					<h1>Produits</h1>
				</Col>

				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus" />creer un Produit
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORIES</th>
							<th>Brand</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit" />
										</Button>
									</LinkContainer>
									<Button
										className="btn-sm"
										variant="danger"
										onClick={() => deleteHandler(product._id)}
									>
										<i className="fa fa-trash" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};
export default ProductListScreen;
