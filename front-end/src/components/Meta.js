import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, descripton, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={descripton} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Bienvenue Chez MymaShop',
	description: 'Nous Vendons les meilleurs produits',
	keywords: 'Homme,Femme,Electroniques ....'
};

export default Meta;
