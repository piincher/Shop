import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
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
						</span>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};
export default Footer;
