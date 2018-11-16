// Layout component
import React from 'react'
import { css } from 'react-emotion'
import { StaticQuery, Link, graphql } from 'gatsby'

import { rhythm } from '../utils/typography'

// const ListLink = props => (
// 	<li style={{ display: `inline-block`, marginRight: `1rem` }}>
// 		<Link to={props.to}>{props.children}</Link>
// 	</li>
// )

export default ({ children }) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
					}
				}
			}
		`
	}
		render={data => (
			<div
		    className={css`
		      margin: 0 auto;
		      max-width: 1000px;
		      padding: ${rhythm(2)};
		      padding-top: ${rhythm(1.5)};
		    `}
		  >
		    <Link to={`/`}>
		      <h3
		        className={css`
		          margin-bottom: ${rhythm(2)};
		          display: inline-block;
		          font-style: normal;
		        `}
		      >
		        {data.site.siteMetadata.title}
		      </h3>
		    </Link>
		    <Link
		      to={`/about`}
		      className={css`
		        float: right;
						padding: 0 10px;
		      `}
		    >
		      About
		    </Link>
				<Link
					to={`/contact`}
					className={css`
						float: right;
						padding: 0 10px;
					`}
				>
					Contact
				</Link>
				<Link
					to={`/my-files`}
					className={css`
						float: right;
						padding: 0 10px;
					`}
				>
					my-files.js
				</Link>
		    {children}
		  </div>
		)}
		/>
)
