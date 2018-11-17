//  A function to implement an API.
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
	// This API will add slugs for your pages.
	const { createNodeField } = actions

	console.log('NODE.INTERNAL.TYPE: ', node.internal.type)

	if (node.internal.type === `AuthJson`) {
		console.log('NODE.INTERNAL.TYPE: ', node.internal.type)
		const fileNode = getNode(node.parent)
		console.log(`\n`, fileNode.relativePath)
		console.log('CREATEFILEPATH:', createFilePath({ node, getNode, basePath: `pages` }))
		const slug = createFilePath({ node, getNode, basePath: `pages` })
		createNodeField({
			node,
			name: `slug`,
			value: slug,
		})
	}
}

// Below code block is for when writing API data to files.
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return new Promise((resolve, reject) => {
		graphql(`
			{
				allAuthJson{
					edges{
						node{
							fields {
								slug
						 	}
						}
					}
				}
			}
		`).then(result => {
			console.log('RESULT: ', JSON.stringify(result, null, 4))
			result.data.allAuthJson.edges.forEach(({ node }) => {
				createPage({
					path: node.fields.slug,
					component: path.resolve(`./src/templates/book-list.js`),
					context: {
						// Data passed to context is available
						// in page queries as GraphQL variables.
						slug: node.fields.slug,
					},
				})
			})
			resolve()
		})
	})
}

/*********************************************************/
// Below code from `gatsby-using-mongodb` repo
// I'm implementing this code block in order to use mLabs!
/********************************************************/
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
/*exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the mongoDB graphql schema.

  // Mongodb{dbName}{collection} is a data node type created from mongoDB is a
  // "connection" (a GraphQL convention for accessing a list of nodes) gives
  // us an easy way to query all documents in the mongoDB collection.

	return new Promise((resolve, reject) => {
	  graphql(`
	    {
	      allMongodbBooksUsers(limit: 1000) {
					totalCount
	        edges {
	          node {
	            fields {
								slug
							}
	          }
	        }
	      }
	    }
	  `).then(result => {
			console.log('RESULT: ', JSON.stringify(result, null, 4))
			// Create pages.
			const pageTemplate = path.resolve(`./src/templates/book-list.js`)
			result.data.allMongodbBooksUsers.edges.forEach(({ node }) => {
				// Gatsby uses Redux to manage its internal state.
				// Plugins and sites can use functions like "createPage"
				// to interact with Gatsby.
				createPage({
					// Each page is required to have a `path` as well
					// as a template component. The `context` is
					// optional but is often necessary so the template
					// can query data specific to each page.
					// We want to create a detailed page for each
					// document in our mongoDB collection
					path: node.fields.slug,
					component: pageTemplate,
					context: {
						slug: node.slug,
					},
				})
			})
			resolve()
		})
	})
}*/
