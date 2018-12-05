import React from "react"
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'
// import notFound from '../pages/notFound'
// import Selects from '../components/selects'

import BestSeller from '../data/models'

export default ({ data }) => {


	function potato({ data }) {
		console.log('yep');
		console.log('INDEX.JS DATA', data)
	}
	potato({ data });

	// IDEA: What if you can get the data here which is already available from graphql, just look at the dev console for the log above, and then iterate thru all 13 nodes, since they are/will be hard wired anyhow!, and get all the best seller lists book data needed then save all that data to the mLabs!
	// // TODO:
/*	allAuthJson
			totalCount
			edges
			 [idx]
			 	node
					last_modified
					num_results
					results
						list_name
						bestsellers_date
						books [
							[idx]
								amazon_product_url
								author
								book_image
								description
								primary_isbn13
								rank
								title
						]
						{
						*/


					/*	  allAuthJson {
						    totalCount
						    edges {
						      node {
						        id
						        num_results
						        last_modified
						        fields {
						          slug
						        }
						        results {
						          list_name
						          bestsellers_date
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
						  }
						}*/



	return (
		<Layout>
			<div>
				<h1
					className={css`
				display: inline-block;
				border-bottom: 1px solid;
			`}
				>
				<img  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/nyt-logo.png" height="80" id="nyt-logo" alt="ny time logo" className={css`
					float: left;
					padding: 0 20px 0 0;`}/>	NYT Books Best Sellers Lists
				</h1>
				<h4>{data.allAuthJson.totalCount} Best Seller Lists</h4>
				{data.allAuthJson.edges.map(({ node }) => (
					<div key={node.id}>
					<Link
						to={node.fields.slug}
						className={css`
							text-decoration: none;
							color: inherit;
						`}>
							<h3
								className={css`
							margin-bottom: ${rhythm(1 / 4)};
							border: 1px solid red;
						`}
							>
								{node.results.list_name}{" "}
								<br />
								<span
									className={css`
								color: #bbb;
							`}
								>
									Number Of Books — {node.num_results}
								</span>
								<br />
								<span
									className={css`
								color: #bbb;
								border: 1px solid red;
							`}
								>
									Last Updated — {node.last_modified}
								</span>
							</h3>
							<p>{node.excerpt}</p>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	)
}

/*export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
					fields {
						slug
					}
          excerpt
        }
      }
    }
  }
`*/

export const query = graphql`
  query {
		allAuthJson(sort: { fields: [last_modified], order: DESC }) {
			totalCount
			edges {
				node {
					id
					num_results
					last_modified(formatString: "DD MMMM, YYYY")
					fields {
						slug
					}
					results {
						list_name
						bestsellers_date
						books {
							rank
							primary_isbn13
							title
							description
							author
							book_image
							amazon_product_url
						}
					}
				}
			}
		}
	}
`
