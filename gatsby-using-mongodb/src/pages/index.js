import React from "react"
import { graphql } from "gatsby"
import StoryItem from "../components/story-item"
import Layout from "../layouts"

class Index extends React.Component {
	//	///////////////////////////////////////////
	//	This is a smaller container comonent.
	//	Has lime border.
	//	///////////////////////////////////////////
  render() {
    const { allMongodbBooksUsers } = this.props.data
	console.log('PAGES=========================', this.props.data);

    return (
      <Layout>
        <div style={{'border': '2px solid lime'}}>
          <h1>Website information stored in MongoDB via MLABS!</h1>
					<h3>This Data is being pulled from mLabs database that I sent up!</h3>
					<h6>/Projects/Project12/MERN_Research/gatsby_tutorial/gatsby-using-mongodb/</h6>
					<h4>Number Of Users In The mLabs `books` database: {allMongodbBooksUsers.totalCount}</h4>
          <ul>
            {allMongodbBooksUsers.edges.map(({ node }) => (
              <StoryItem item={node} key={node.id} />
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    allMongodbBooksUsers {
			totalCount
      edges {
        node {
          id
          fullName
					emailAddress
					password
        }
      }
    }
  }
`
