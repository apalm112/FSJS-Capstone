import React from "react"
import { css } from 'react-emotion'
import { Link, graphql } from "gatsby"
import ErrorBoundary from '../components/ErrorBoundary'
import Layout from "../components/layout"
// import Book from '../data/models'
import { rhythm } from '../utils/typography'


export default ({ data }) => {
	// const getListName = data.authJson.results.pop();
  const potato = Object.values(data.authJson.results)
	const book = Object.values(data.authJson.results.books)
	console.log('BOOK-LIST: ', book)

		// book.map((curr, idx) => (
		// 	console.log(curr.title)
		// ))



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
        <h1>{potato[0]}</h1>
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
								<td>{curr.title}</td>
								<td>{curr.author}</td>
								<td>{curr.description}</td>
								<td>{curr.primary_isbn13}</td>
								<td>
									<img src={book[idx].book_image} alt="book cover" />
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
			results {
				list_name
				books {
					rank
					primary_isbn13
					description
					title
					author
					book_image
					amazon_product_url
				}
			}
    }
  }
`
