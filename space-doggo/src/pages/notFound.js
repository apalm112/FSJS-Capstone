import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Header from '../components/header';
// import styles from './about-css-modules.css';

export default ({ data }) => (
	<Layout>
		<h1>{data.site.siteMetadata.title}</h1>
		<div style={{ color: 'lime' }}>
			<Header
				headerText='The page you are looking for is not here.  No books or asteroids.'
			/>
			<h6>{data.site.siteMetadata.konami_code} 404</h6>
		</div>
	</Layout>
)

export const query = graphql`
	query {
		site {
			siteMetadata {
				title
				literally
			}
		}
	}
`
