import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const CartScreen = lazy(() => import('./screens/CartScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const UserListScreen = lazy(() => import('./screens/UserListScreen'));
const UserEditScreen = lazy(() => import('./screens/UserEditScreen'));
const ProductListScreen = lazy(() => import('./screens/ProductListScreen'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'));
const OrderListScreen = lazy(() => import('./screens/OrderListScreen'));
const SupportScreen = lazy(() => import('./screens/SupportScreen'));

const App = () => {
	return (
		<Suspense fallback={<div>loading...</div>}>
			<Router>
				<Header />
				<main className="py-3">
					<Container>
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/admin/userlist" component={UserListScreen} />
						<Route path="/admin/user/:id/edit" component={UserEditScreen} />
						<Route path="/admin/productlist" component={ProductListScreen} exact />
						<Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
						<Route path="/admin/product/:id/edit" component={ProductEditScreen} />
						<Route path="/admin/orderlist" component={OrderListScreen} />
						<Route path="/admin/support" component={SupportScreen} />
						<Route path="/search/:keyword" component={HomeScreen} exact />
						<Route path="/page/:pageNumber" component={HomeScreen} exact />
						<Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
						<Route path="/" component={HomeScreen} exact />
					</Container>
				</main>
				<Footer />
			</Router>
		</Suspense>
	);
};

export default App;
