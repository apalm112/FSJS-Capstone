const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('https');
const sassMiddleware = require('node-sass-middleware');
const createError = require('http-errors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const indexRouter = require('./routes/index');
const schoolsRouter = require('./routes/schools');

const School = require('./database/models').School;

const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;
const MONGOLAB_URI  = process.env.MONGOLAB_URI;

const app = express();

//	The port (3000) in the “proxy” line, which goes in the create-react-app's package.json file in the client folder, must match the port that your Express server is running on!
let port = process.env.PORT || 3000;
app.set('port', port);

app.use(methodOverride('_method'));
// morgan gives us http request logging output for the CLI
app.use(logger('dev'));
// app object registers middleware w/ use(), applies it to all routes.
app.use(bodyParser.json());
// express || body-parser middleware parses request to make it accessible to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
//	This line tells Express(Node.js) to use the provided CSS, Image files. Serve static files from the React app, `express.static` is in charge of sending static files requests to the client. So when the browser requests logo.png from your site, it knows to look in the build folder for that.
app.use(express.static(path.join(__dirname, 'public')));

// Binds the routes to app object, mounts the routes to the express app specifiying '/' as the path.
app.use('/', indexRouter);
app.use('/', schoolsRouter);

// Not sure about this line here, trying it out tho:
app.use(require('cors')());
app.use(methodOverride('_method'));

/**********************************************************/
mongoose.connect(MONGOLAB_URI || 'mongodb://localhost:27017/api', { autoIndex: false, useNewUrlParser: true });

// Create a variable to hold the database connection object.
const database = mongoose.connection;

// mongoose.set('debug', true);  //<--runs debugger in terminal

database.on('error', (error) => {
	// set terminal stdout color red for error message
	console.log('\n       \x1b[41m%s\x1b[0m', '-----------------Error Connecting to Database. Connection Failed------------------------');
	console.error('\x1b[31m%s\x1b[0m', (error.message.slice(0, 81) + ']'));
});

database.once('open', () => {
	console.log('\n                \x1b[42m%s\x1b[0m', '-----------------Database Connection Successfully Opened------------------------');
});
/***********************************************************/


/* On server start up immediately check mLab DB for documents,if not there then fetch Socratea data, save to mLab DB. ********/
var socrata = 'https://data.wa.gov/resource/ndsp-2k9r.json?';
var url = `${socrata}&$limit=3000&$$app_token=${SOCRATA_API_KEY}`;
// Query checks mLab DB if data is already saved
let query = School.countDocuments({ }, (err, count) => {
	console.log('COUNT===========================',	count );
	if (!count) {
		//	--if not, then do fetch data from socrata
		console.log('COUNT IS TRUE');
		http.get(url, (res) => {
			var body = '';
			res.on('data',  (chunk) => {
				body += chunk;
			});
			res.on('end', () => {
				var data = JSON.parse(body);
				console.log('# of schools: ', data[0]);
				data.map( (eachSchool) => {
					var school = new School(eachSchool);
					school.save( (error) => {
						if(error) return next(error);
					});
				});
			}).on('error', (e) => {
				console.log('Got an error: ', e);
			});
		});
		console.log('Express, data got fetched');
	} else {
		// 	--if so, then do not fetch data
		console.log('COUNT IS FALSE');
		console.log(':::::::::::::::::::: DB is already populated ::::::::::::');
		console.log('Express, DB data already populated in mLab.');
	}
});
/************************************************************/


/* Error Handling **********************************************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// Catches requests that fall through w/out triggering any route handlers, send 404 if no other route matched
app.use((req, res, next) => {
	let error = new Error('Something went wrong.  API Route Not Found.');
	error.status = 404;
	next(error);
});

// global error handler { "error": {} }
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send({
		err: err,
		status: err.status,
		message: 'you what?'
	});
});

// start listening on our port
app.listen(app.get('port'), () => {
	console.log('\n                \x1b[45m%s\x1b[0m', `The wastate_immunization application is running on localhost ${port}`, '\n');
});
