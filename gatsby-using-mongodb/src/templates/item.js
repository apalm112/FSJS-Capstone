import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts"

class Item extends React.Component {
  render() {
    const story = this.props.data.mongodbBooksUsers

    return (
      <Layout>
        <div>
          <a href={story.id} className="itemlink">
            {story.fullName}
          </a>
          <p>
            <div
              dangerouslySetInnerHTML={{
                __html: story.fullName,
              }}
              className="story"
            />
          </p>
        </div>
      </Layout>
    )
  }
}

export default Item

export const pageQuery = graphql`
  query($id: String!) {
    mongodbBooksUsers(id: { eq: $id }) {
      id
			fullName
			emailAddress
			password
    }
  }
`
