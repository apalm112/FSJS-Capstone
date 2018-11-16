import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Header from '../components/header';
// import styles from './about-css-modules.css';

export default ({ data }) => (
	<Layout>
		<h1>{data.site.siteMetadata.title}</h1>
		<h4>{data.site.siteMetadata.literally}</h4>
		<div style={{ color: 'lime' }}>
			<Header
				headerText='Abou: Project uses Gatsby and React.'
			/>
			<Header
				headerText='Such wow, most excellent.'
			/>
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
