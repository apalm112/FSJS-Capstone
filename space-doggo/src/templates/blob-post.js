/*import React from "react"
import { css } from 'react-emotion'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { rhythm } from '../utils/typography'

export default ({ data }) => {
  const post = data.markdownRemark
	console.log('POST: ', post);
  return (
    <Layout>
      <div>
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
        <h1>Here is the {post.frontmatter.title} Best Sellers List</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
*/
