# Sacue: https://github.com/gatsbyjs/gatsby/tree/master/examples/using-mongodb

# Live: https://using-mongodb.gatsbyjs.org


### CLI Errors:

`error gatsby-node.js returned an error


  TypeError: Cannot read property 'allMongodbBooksUsers' of undefined`

* And:

`warning The GraphQL query in the non-page component "/home/sofa_king/Team_Treehouse/Projects/Project12/MERN_Research/gatsby_tutorial/gatsby-using-mongodb/src/templates/item.js" will not be run.
Exported queries are only executed for Page components. Instead of an exported
query, either co-locate a GraphQL fragment and compose that fragment into the
query (or other fragment) of the top-level page that renders this component, or
use a <StaticQuery> in this component. `


* Prolly caused by removal of `async, await` in `gatsby-node.js` file.

* I had to replace that w/ code from my `gatsby/space-doggo` repo that works.

### GraphQL localhost:8000/\___graphql

```
{

  allMongodbBooksUsers {
    totalCount
    edges  {
      node {
        id
        fullName
        emailAddress
        password
        mongodb_id
        internal {
          type
          content
        }
      }
    }
  }
  mongodbBooksUsers {
    id
    fullName
    emailAddress
    password
  }
}
```
