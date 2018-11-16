import React from "react"
import { css } from 'react-emotion'
import { Link, graphql } from "gatsby"
import ErrorBoundary from '../components/ErrorBoundary'
import Layout from "../components/layout"
import Book from '../data/models'
import { rhythm } from '../utils/typography'

import GOOGLE_BOOKS_KEY from '../../config/GOOGLE_BOOKS_KEY'

import fetch from 'isomorphic-fetch'
// const potato = require('../app')

export default ({ data }) => {
  const book = data.authJson.results
	// console.log('BOOK-LIST: ', potato)


	const GoogleBookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
	var isbn13Placeholder = [ 9781501100109 ];
	/* FETCH HELPER FUNCTIONS: ************************************************************/
	function validateStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}
	function readResponseAsJSON(response) {
		// console.dir(response.body);
		return response.json();	// The important line, holds the fetched data.
	}
	function manipulateImages(results) {
		results = results.items 	// Manipulates the fetched data. NYT=results.results,GOOGLE=results.items
		// BUG: TypeError: Cannot read property 'map' of undefined at manipulateImages:
		// console.log('MANIPULATE IMAGES:   RESULTS==================================:', results);
		var newResults = results.map(curr => curr.volumeInfo.imageLinks.thumbnail);
		// console.log('MANIPULATE IMAGES:   NEW RESULTS==================================:', newResults);
		return newResults;
	}
	function logError(error) {
		console.warn('Request Failed', error);
		return null;
	}
	/* END FETCH HELPER FUNCTIONS: **************************************/
	/* FETCH GOOGLE BOOKS API FOR COVER IMAGE****************************/
	function fetchGoolgeBookImg() {
		const encodedURI = encodeURI(`${GoogleBookURL}${isbn13Placeholder}&key=${GOOGLE_BOOKS_KEY}`);
		return fetch(encodedURI, { mode: 'cors' })
			.then(validateStatus)
			.then(readResponseAsJSON)
			.then(manipulateImages)
			.then(results => {
				var potato = results
				console.log('POTATO: ', potato);
				var book = new Book(potato);
				book.save((error) => {
					if(error) return error;
				});
				return  potato; })
			.catch(logError);
	}
	let potato = fetchGoolgeBookImg();

  return (
    <Layout>
      <div>
				<ErrorBoundary>
				<Link to={`/`}>
					<h5
						className={css`
							margin-bottom: ${rhythm(2)};
							display: inline-block;
							font-style: normal;
						`}
					>
						🡐 Go Back
					</h5>
				</Link>
				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/nyt-logo.png" height="80" id="nyt-logo" alt="ny times logo" className={css`
					float: left;
					padding: 0 20px 0 0;`}/>
				<h1>Hello slug fields</h1>
        <h1>{book[0].list_name}</h1>
				<table>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Title</th>
							<th>Author</th>
							<th>Description</th>
							<th>ISBN</th>
							<th>Cover Image</th>
							<th>Amazon</th>
						</tr>
					</thead>
					<tbody>
						{book.map((curr, idx) => (

							<tr key={curr.rank}>
								<td>{curr.rank}</td>
								<td>{curr.book_details[0].title}</td>
								<td>{curr.book_details[0].author}</td>
								<td>{curr.book_details[0].description}</td>
								<td>{curr.book_details[0].primary_isbn13}</td>
								<td>
									<img src={potato} alt="book cover" />
								</td>
								<td><a href={book[idx].amazon_product_url}>BUY</a></td>
							</tr>

						))}
					</tbody>
				</table>
				</ErrorBoundary>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    authJson(fields: { slug: { eq: $slug } }) {
			id
			results {
				list_name
				amazon_product_url
				rank
				book_details {
					title
					author
					description
					primary_isbn13
				}
			}
    }
  }
`
