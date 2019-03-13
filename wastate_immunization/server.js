'use strict';

const express = require('express');
const createError = require('http-errors');
const http = require('https');
// const fs = require('fs');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

// const MarkerClusterer = require('./public/vendors/scripts/markerclusterer');
const School = require('./database/models').School;

const indexRouter = require('./routes/index');
const schoolsRouter = require('./routes/schools');

const MONGOLAB_URI  = process.env.MONGOLAB_URI;
const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;

const app = express();

//	The port (3000) in the “proxy” line, which goes in the create-react-app's package.json file in the client folder, must match the port that your Express server is running on!
// let port = process.env.PORT || 3000;
app.set('port', process.env.PORT || 4000);

app.use(methodOverride('_method'));
// morgan gives us http request logging output for the CLI
app.use(logger('dev'));
// app object registers middleware w/ use(), applies it to all routes.
app.use(express.json());
// express || body-parser middleware parses request to make it accessible to req.body
app.use(express.urlencoded({ extended: false }));

app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
//	This line tells Express(Node.js) to use the provided CSS, Image files. Serve static files from the React app, `express.static` is in charge of sending static files requests to the client. So when the browser requests logo.png from your site, it knows to look in the public folder for that.
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Binds the routes to app object, mounts the routes to the express app specifiying '/' as the path.
app.use('/', indexRouter);
app.use('/', schoolsRouter);

// Not sure about this line here, trying it out tho:
app.use(require('cors')());
app.use(methodOverride('_method'));


/* Database Connection ********************************************************************/
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

/**********************************************************************************/
/* Validate mLab Schools collection if it's already populated or not.************************/
// Tried running this code from inside the routes/index.js file, but it would not work.  Only seems to work properly here in the server.js
const socrataView = {};

socrataView.dropSchools = function() {
	// drop the collection from the mLab DB
	database.dropCollection('schools');
	console.log(':::::::::::::::::::: COUNT IS FALSE    Collection has been dropped ::::::::::::');
	// then call method to repopulate it
	socrataView.fetchAll();
}

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
			console.log('# of schools: ', data[0]);
			data.map( (eachSchool) => {
				var school = new School(eachSchool);
				school.save( (error) => {
					if(error) return (error);
				});
			});
		}).on('error', (e) => {
			console.log('Got an error: ', e);
		});
	})
};	// end socrataView.fetchAll()

socrataView.checkMLabDBForData = function () {
	// Query checks mLab DB if data is already saved
	School.countDocuments({ }, (err, count) => {
		console.log('COUNT===========================',	count );
		//	--if not, then do fetch data from socrata
		if (!count) {
			console.log('COUNT IS TRUE  Express, data got fetched');
			socrataView.fetchAll();
			// 	--if so, then do not fetch data
		} else {
			// call function to first drop the collection each time
			socrataView.dropSchools();
		}
	});
};
socrataView.checkMLabDBForData();



// Put all API endpoints under '/api'
app.get('/api/schools', (req, res) => {
	School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
		.exec(function(error, schools) {
			console.log('From server.js file /api/schools route:------>\n', schools);
			res.json(schools);
		});
});


/**********************************************************************************/
// IS NOT WORKING
/*var mapView = {};

mapView.initMap = function(dataPassedIn) {
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++');
	var waCenter = { lat: 47.3232, lng: -120.3232 };
	var map = new window.google.maps.Map(document.getElementById('map'), {
		center: waCenter,
		zoom: 6
	});
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var markers = dataPassedIn.map(function(school, idx) {
		return new google.maps.Marker({
			position: school,
			label: labels[idx % labels.length]
		});
	});
	var markerCluster = new MarkerClusterer(map, markers,
		{imagePath: './public/vendors/images/m'});
};

mapView.getAll = function(next) {
	fs.readFile('http://localhost:4000/database/schools.json', (res) => {
		this.localStorage.hackerIpsum = JSON.stringify(res);
		mapView.initMap(res);
	});
};

mapView.getAll();*/
/**********************************************************************************/



// Teh "catch-all" handler:  It needs to be near the bottom of your server file so that it will only be enacted if the API routes above it don't handle the request. It's in charge of sending the main index.html file back to the client if it didn't receive a request it recognized otherwise.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});


/* Error Handling ****************************************************************************/
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

// start listening on our port, log message to stdout
const server = app.listen(app.get('port'), () => {
	console.log('\n                \x1b[45m%s\x1b[0m', `The wastate_immunization Express server is listening on port ${server.address().port}`, '\n');
});
