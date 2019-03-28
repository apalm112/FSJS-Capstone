'use strict';

const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const http = require('https');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const School = require('./database/models').School;

const immunizationRouter = require('./routes/immunization');
const reasonRouter = require('./routes/reason');
const schoolRouter = require('./routes/school');

const MONGOLAB_URI  = process.env.MONGOLAB_URI;
const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;

const app = express();

//	The port (4000) in the “proxy” line, which goes in the create-react-app's package.json file in the client folder, must match the port that your Express server is running on!
app.set('port', process.env.PORT || 4000);

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(cors());
app.use(methodOverride('_method'));
// morgan gives us http request logging output for the CLI
app.use(logger('dev'));
app.use(express.json());
// express || body-parser middleware parses request to make it accessible to req.body
app.use(express.urlencoded({ extended: false }));

//	This line tells Express(Node.js) to use the provided CSS, Image files. Serve static files from the React app, `express.static` is in charge of sending static files requests to the client. So when the browser requests logo.png from your site, it knows to look in the public folder for that.
app.use(express.static(path.join(__dirname, 'client', 'build')));

/*	Binds the routes to app object, mounts the routes to the express app specifiying '/<route>' as the path. Routes query mLab DB & return data to React **/
app.use('/immunization', immunizationRouter);
app.use('/school', schoolRouter);
app.use('/reason', reasonRouter);

/* Database Connection ********************************************************************/
mongoose.connect(MONGOLAB_URI || 'mongodb://localhost:27017/api', { autoIndex: false, useNewUrlParser: true });

// Create a variable to hold the database connection object.
const database = mongoose.connection;
// mongoose.set('debug', true);  //<--runs debugger in terminal

database.on('error', (error) => {
	// set terminal stdout color red for error message
	console.log('\n       \x1b[41m%s\x1b[0m', '-----------------Error Connecting to Database. Connection Failed------------------------');	// eslint-disable-line no-console
	console.error('\x1b[31m%s\x1b[0m', (error.message.slice(0, 81) + ']')); // eslint-disable-line no-console
});

database.once('open', () => {
	console.log('\n                \x1b[42m%s\x1b[0m', '-----------------Database Connection Successfully Opened------------------------');	// eslint-disable-line no-console
});

/********************************************************/
const socrataView = {};
socrataView.fetchAll = function() {
	const socrata = 'https://data.wa.gov/resource/ndsp-2k9r.json?';
	const url = `${socrata}&$limit=3000&$$app_token=${SOCRATA_API_KEY}`;

	http.get(url, (res) => {
		var body = '';
		res.on('data',  (chunk) => {
			body += chunk;
		});
		res.on('end', () => {
			var data = JSON.parse(body);
			data.map( (eachSchool) => {
				var school = new School(eachSchool);
				school.save( (error) => {
					if(error) return (error);
				});
			});
		}).on('error', (e) => {
			console.error('Error fetching the data: ', e); //eslint-disable-line no-console
		});
	});
};

socrataView.checkMLabDBForData = function () {
	// drop the collection from the mLab DB
	database.dropCollection('schools');
	console.log('::::::::::::::::::::Collection has been dropped ::::::::::::');
	// Query checks mLab DB if data is already saved
	School.countDocuments({ }, (err, count) => {
		console.log('COUNT',	count );
		//	--if not, then do fetch data from socrata
		if (!count) {
			console.log('Express fetched the data');
			socrataView.fetchAll();
		}
	});
};
socrataView.checkMLabDBForData();

/* Error Handling *************************************************************/
// Function is a catch all for routes that get missed.  Stops JSON from being sent to browser on refresh.
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/public/index.html'), (err) => {
		if (err) { res.status(500).send(err); }
	});
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
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

// start listening on our port, log message to stdout
const server = app.listen(app.get('port'), () => {
	console.log('\n                \x1b[45m%s\x1b[0m', `The wastate_immunization Express server is listening on port ${server.address().port}`, '\n');	// eslint-disable-line no-console
});
