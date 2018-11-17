const MLAB_KEYS = require('./config/keys');
const NYT_BOOK_KEY = require('./config/NYT_KEY');
// 	{	path: '/best-seller/:id',
// 			(path = '') =>
// 			(path.split('/').pop()),
var path = 'science';
// var image = 'animalsImage'
// const GoogleBookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
// const coverImage = '9780393609394';

module.exports = {
	siteMetadata: {
		title: 'Book Marks or Asteroids',
		literally: 'anything'
	},
	plugins: [
		{
			//	https://www.gatsbyjs.org/packages/gatsby-source-mongodb/
			//  MLABS Connection String: 'mongodb://test_user:hobbits1@ds141633.mlab.com:41633/books'
			resolve: `gatsby-source-mongodb`,
			options: {
				dbName: MLAB_KEYS.dbName,
				collection: [ `users` ],
				auth: {	user: MLAB_KEYS.user, password: MLAB_KEYS.password	},
				server: {	address: MLAB_KEYS.address,	port: MLAB_KEYS.port	},
				map: { documents: {	description: 'application/json'	}	},
				autoIndex: false,
				useNewUrlParser: true,
			},
		},
		'gatsby-transformer-json',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-emotion`,
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigureModule: 'src/utils/typography.js',
			},
		},
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists.json?list-name=${path}&api-key=${NYT_BOOK_KEY}`,

				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `${path}`,

				// Simple authentication, if optional, set it null
				auth: null,

				// Optionally save the JSON data to a file locally
				// Default is false
				localSave: true,

				//	Required folder path where the data should be saved if using localSave option
				//	This folder must already exist
				path: `${__dirname}/src/data/auth/`,

				// Optionally include some output when building
				// Default is false
				verboseOutput: true, // For debugging purposes

				// Optionally skip creating nodes in graphQL.	Use this if you only want
				// The data to be saved locally
				// Default is false
				skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
			}
		},
	],
	mapping: {
		// Not working:
		// https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
		'ScienceJson.results.book_details.primary_isbn13': `IsbnJson`
	},
};
