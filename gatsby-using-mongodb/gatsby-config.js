/* eslint-disable */
const MLAB_KEYS = require('./src/config');

module.exports = {
  siteMetadata: {
    title: `Gatsby with MongoDB`,
  },
  plugins: [
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: MLAB_KEYS.dbName,
        collection: `users`,
        server: { address: MLAB_KEYS.address, port: MLAB_KEYS.port },
        auth: { user: MLAB_KEYS.user, password: MLAB_KEYS.password },
        map: { documents: { description: `application/json` } },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
  ],
}
