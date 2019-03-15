'use strict';

const express = require('express');
const createError = require('http-errors');
// Node packages.
const fs = require('fs');
const http = require('https');

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
app.set('port', process.env.PORT || 4000);

app.use(require('cors')());

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
	console.log('\n       \x1b[41m%s\x1b[0m', '-----------------Error Connecting to Database. Connection Failed------------------------');	// eslint-disable-line no-console
	console.error('\x1b[31m%s\x1b[0m', (error.message.slice(0, 81) + ']')); // eslint-disable-line no-console
});

database.once('open', () => {
	console.log('\n                \x1b[42m%s\x1b[0m', '-----------------Database Connection Successfully Opened------------------------');	// eslint-disable-line no-console
});


	app.get('/api/hello', (req, res) => {
		res.send({ express: 'Hellos froms Expresses' });
	});
	app.post('/api/puff', (req, res) => {
		res.send(`Express server received your POST request. This is what you sent: ${req.body.post}`);
	});




/**********************************************************************************/
/* Validate mLab Schools collection if it's already populated or not.************************/
// TODO: 	** Tried running this code from inside the routes/index.js file, but it would not work.  Only seems to work properly here in the server.js
//				** Place the socrataView{} inside a post route??
const socrataView = {};

// socrataView.dropSchools = function() {
// 	// drop the collection from the mLab DB
// 	database.dropCollection('schools');
// 	console.log(':::::::::::::::::::: COUNT IS FALSE    Collection has been dropped ::::::::::::');
// 	// then call method to repopulate it
// 	socrataView.fetchAll();
// };

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
			// console.log('# of schools: ', data[0]);
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
};	// end socrataView.fetchAll()

socrataView.checkMLabDBForData = function () {
	// drop the collection from the mLab DB
	database.dropCollection('schools');
	console.log('::::::::::::::::::::Collection has been dropped ::::::::::::');
	// Query checks mLab DB if data is already saved
	School.countDocuments({ }, (err, count) => {
		console.log('COUNT===========================',	count );
		//	--if not, then do fetch data from socrata
		if (!count) {
			console.log('COUNT IS TRUE  Express, data got fetched');
			socrataView.fetchAll();
			// 	--if so, then do not fetch data
		}
		// else {
		// 	// call function to first drop the collection each time
		// 	socrataView.dropSchools();
		// }
	});
};
socrataView.checkMLabDBForData();

const writeSchoolsFile = (data) => {
	// This isn't working either!!!!!!!!!!!!!!!!!!
	var saveData = JSON.stringify(data);
	fs.writeFile('./client/src/schools.json', saveData, (err) => {
		if (err) throw err;
		console.log('File successfully written! --Check directory for file.');
	});
};
/***************************************************
	routes to query mLab DB & return data to React	 *
                                                   *
 ***************************************************/
// Put all API endpoints under '/api'Put all API endpoints under '/api'
app.get('/api/schools', (req, res) => {
	// School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
	School.find({})	// Find All Schools in Collection: There 2248 Schools w/ valid coordinates. There are 347 Schools which have the coordinates as an empty value, i.e.-- {}
		.exec(function(error, schools) {
			// console.log('From server.js file /api/schools route:------>\n', schools);
			var getMuhData = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.json(getMuhData);
		});
});

app.get('/schools/mumps', (req, res) => {
// This route will display the results for 'exempt_for_mumps'. There are 2253 shools from this query.
	// var exempt_for_mumps = '$where=percent_exempt_for_measles_mumps_rubella>0.0&$limit=3000';
	School.find({ 'number_exempt_for_measles_mumps_rubella': { $gt: 0 } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			res.json(schools.length);
		});
});


app.get('/schools/victor', (req, res) => {
// This route will display the results for "VICTOR FALLS ELEMENTARY".
//	Which DOES NOT HAVE COORDINATES.
	School.find({ 'school_name': 'VICTOR FALLS ELEMENTARY' })
		.exec(function(error, schools) {
			console.log('MT', schools[0].location_1.coordinates);
			res.json(schools);
		});
});


app.get('/schools/desert', (req, res) => {
// This route will display the results for "DESERT HILLS MIDDLE SCHOOL"
//	Which HAS COORDINATES.
	School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
		.exec(function(error, schools) {
			console.log(schools);
			res.json(schools[0].location_1.coordinates);
		});
});

app.get('/schools/coords/no', (req, res) => {
// This route will display the results for all schools w/ NO COORDINATES. There are 347
//	https://data.wa.gov/resource/ndsp-2k9r.json?$where=within_circle(location_1, 47.59, -122.33, 1000)
/*		 "location_1": {
        "coordinates": []
    }
*/
	School.find({ 'location_1.coordinates': { $eq: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			res.json(schools.length);
		});
});

app.get('/schools/coords/yes', (req, res) => {
// This route will display the results for all schools w/ COORDINATES. There are 2248
	School.find({ 'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			res.json(schools);
		});
});

app.get('/schools/reported_yes', (req, res) => {
// This route will display the results for all schools w/ which DID REPORT immunizations && Have Coordinates.
//	 there are 2478 Total.
//	2147 HAVE COORDINATES
// 	 331 HAVE NO COORDINATES
	School.find({ 'reported': { $eq: 'Y' },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var reportYes = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(reportYes);
		});
});

app.get('/schools/reported_no', (req, res) => {
// This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 117.
	School.find({ 'reported': { $eq: 'N' } })
		.exec(function(error, schools) {
			// console.log('# of schools: ', schools.length);
			var reportNo = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			// writeSchoolsFile(reportNo); NOT WORKING
			res.json(reportNo);
		});
});

app.get('/schools/personal_exemption_zero', (req, res) => {
// This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 235.  46 have NO coordinates and 189 do Have coordinates.
//	This route is creates an array of coordinates for loading cluster markers into the map.
	School.find({
		'number_with_personal_exemption': { $eq: 0.0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = eachSchool.location_1.coordinates;
				// console.log( coords );
				return { lng: coords[0], lat: coords[1] };
			});
			console.log(locale);
			res.json(locale);
		});
});

app.get('/schools/personal_exemption_zero/no_coords', (req, res) => {
// This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 235, AND have NO coordinates, there are 46!
//	This route is for loading cluster markers into the map.
	School.find({
		'number_with_personal_exemption': { $eq: 0.0 },
		'location_1.coordinates': { $eq: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = {
					'address': eachSchool.location_1_address,
					'city': eachSchool.location_1_city
				};
					return coords;
			});
			console.log('# of schools: ', locale);
			res.json(locale.length);
		});
});
/******************************************************************************/


// Teh "catch-all" handler:  It needs to be near the bottom of your server file so that it will only be enacted if the API routes above it don't handle the request. It's in charge of sending the main index.html file back to the client if it didn't receive a request it recognized otherwise.
app.get('/', (req, res) => {
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
	console.log('\n                \x1b[45m%s\x1b[0m', `The wastate_immunization Express server is listening on port ${server.address().port}`, '\n');	// eslint-disable-line no-console
});
