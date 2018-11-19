const MLAB_KEYS = require('./config/keys');
const NYT_BOOK_KEY = require('./config/NYT_KEY');
// 	{	path: '/best-seller/:id',
// 			(path = '') =>
// 			(path.split('/').pop()),

// TODO: use the list below to create a function that will iterate thru it to:
// 	make an api fetch for that each topic

/*Topics Update in 2018:
--------------------------
Science
Sports
Business Books
audio Nonfiction
audio Fiction
Picture Books
Advice How-To and Miscellaneous
Paperback Nonfiction
Hardcover Nonfiction
Hardcover Fiction
Combined Print and E-Book Fiction
Combined Print and E-Book Nonfiction*/

module.exports = {
	siteMetadata: {
		title: 'Book Marks or Asteroids',
		literally: 'anything'
	},
	plugins: [
		{
			//	https://www.gatsbyjs.org/packages/gatsby-source-mongodb/
			resolve: `gatsby-source-mongodb`,
			options: {
				dbName: MLAB_KEYS.dbName,
				collection: [ `users` ],
				auth: {	user: MLAB_KEYS.user, password: MLAB_KEYS.password	},
				server: {	address: MLAB_KEYS.address,	port: MLAB_KEYS.port	},
				map: { documents: {	body: 'application/json'	}	},
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
		// `gatsby-transformer-remark`,
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
				url: `https://api.nytimes.com/svc/books/v3/lists//science.json?&api-key=${NYT_BOOK_KEY}`,
				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=${path}&api-key=${NYT_BOOK_KEY}`,

				method: 'get',
				headers: {
					'Content-Type': 'application/json'
				},
				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `science`,
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
				skipCreateNode: true, // skip import to graphQL, only use if localSave is all you want
			}
		},
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//sports.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=sports&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `sports`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//business-books.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=business-books&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `businessBooks`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//hardcover-nonfiction.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=hardcover-nonfiction&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `hardcoveNonfiction`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//advice-how-to-and-miscellaneous.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=advice how to and miscellaneous&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `adviceHowToAndMiscellaneous`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//education.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=advice how to and miscellaneous&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `education`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//manga.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=advice how to and miscellaneous&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `manga`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//food-and-fitness.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=advice how to and miscellaneous&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `foodAndFitness`,

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
		{
			resolve: 'gatsby-source-apiserver',
			options: {
				// The url, this should be the endpoint you are attempting to pull data from
				url: `https://api.nytimes.com/svc/books/v3/lists//animals.json?&api-key=${NYT_BOOK_KEY}`,

				// url: `https://api.nytimes.com/svc/books/v3/lists/.json?list-name=advice how to and miscellaneous&api-key=${NYT_BOOK_KEY}`,


				method: 'get',

				headers: {
					'Content-Type': 'application/json'
				},

				// Request body
				data: {},

				// Name of the data to be downloaded.	Will show in graphQL or be saved to a file
				// using this name. i.e. posts.json
				name: `animals`,

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
	// mapping: {
	// 	// Not working:
	// 	// https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
	// 	'ScienceJson.results.book_details.primary_isbn13': `IsbnJson`
	// },
};
