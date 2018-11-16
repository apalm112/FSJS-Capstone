import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log('DATA>>>>>>', data)
  return (
    <Layout>
			<div>HELLO BOOK DATA WORLD</div>
			<div>
				<h1>BOOK LIST DATAS!</h1>
				<table>
					<thead>
						<tr>
							<th>amazon link</th>
							<th>title</th>
							<th>author</th>
							<th>description</th>
							<th>primary_isbn13</th>
						</tr>
					</thead>
					<tbody>

						{data.allAuthJson.edges.map(({ node }, index) => (
							node.results.map(( curr, idx ) => (

								<tr key={idx}>
									<td><a href={curr.amazon_product_url}>Buy</a></td>

									<td>{curr.book_details[0].title}</td>
									<td>{curr.book_details[0].author}</td>
									<td>{curr.book_details[0].description}</td>
									<td>{curr.book_details[0].primary_isbn13}</td>
								</tr>
							))
						))}
			</tbody>
		</table>
	</div>
    </Layout>
  )
}

// export const query = graphql`
//   query {
//     allFile {
//       edges {
//         node {
// 					name
//           relativePath
//           prettySize
//           extension
//           birthTime(fromNow: true)
//         }
//       }
//     }
//   }
// `

export const books_query = graphql`
	query {
		allAuthJson {
	     edges {
	       node {
	         results  {
						 isbns {
							 isbn13
						 }
	           amazon_product_url
	           book_details {
	             title
	             author
	             description
	             primary_isbn13
	           }
	         }
	       }
	     }
	   }
	}
`
