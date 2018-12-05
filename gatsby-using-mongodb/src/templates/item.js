// import React from "react"
// import { graphql } from "gatsby"
// import Layout from "../layouts"
//
// class Item extends React.Component {
// 	//	///////////////////////////////////////////
// 	//	This component IS NOT BEING RENDERED.
// 			DUE TO GRAPHQL ERROR
// 			Uncomment & run $ g
// 			To see the error message in CLI.
// 	//	Has blue border.
// 	//	///////////////////////////////////////////
//   render() {
//     const story = this.props.data.mongodbBooksUsers
// 		console.log('TEMPLATES=========================', this.props.data);
//
//     return (
//       <Layout>
// 				<h1>ROCK</h1>
//         <div style={{'border': '3px solid purple'}} >
//           <a href={story.id} className="itemlink">
//             {story.fullName}
//           </a>
//           <p>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: story.fullName,
//               }}
//               className="story"
//             />
//           </p>
//         </div>
//       </Layout>
//     )
//   }
// }
//
// export default Item
//
// export const pageQuery = graphql`
//   query($id: String!) {
//     mongodbBooksUsers(id: { eq: $id }) {
//       id
// 			fullName
// 			emailAddress
// 			password
//     }
//   }
// `
