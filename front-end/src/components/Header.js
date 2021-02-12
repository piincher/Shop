import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="light" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>MYEMPIREBYMYMA</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart" /> Panier
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profil</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>se déconnecter</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user" /> Se Connecter
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo &&
							userInfo.isAdmin && (
								<NavDropdown title="Admin" id="username">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Utilisateurs</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>produits</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Commandes</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
