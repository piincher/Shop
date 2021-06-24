import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ChatBox from './ChatBox';

const Footer = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Developpé &copy; By{' '}
						<span style={{ color: '#213900' }}>
							<a href="https://ibrahimkouma.netlify.app/" target="_blank" rel="noreferrer">
								Ibrahim
							</a>
							{userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
						</span>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};
export default Footer;
