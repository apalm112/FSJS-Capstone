import React from "react"
import { Link, graphql } from "gatsby"

class StoryItem extends React.Component {
	//	///////////////////////////////////////////
	//	This is the repeatable document data display comonent.
	//	Has red border.
	//	///////////////////////////////////////////
  render() {
    const item = this.props.item
    return (
      <li style={{'border': '1px solid red'}}>
        <div>
					<ul style={{'border': '1px solid red'}} >
						<li>User: {item.fullName}</li>
						<li>Email: {item.emailAddress}</li>
						<li>Hashed password: {item.password}</li>
					</ul>
          <a href={item.fullName}>{item.emailAddress}</a> —{` `}
          <Link to={`/item/${item.id}/`}>more details</Link>
        </div>
      </li>
    )
  }
}

export default StoryItem

export const storyFragment = graphql`
  fragment Story_item on mongodbBooksUsers {
    id
    fullName
		emailAddress
		password
	}
`
