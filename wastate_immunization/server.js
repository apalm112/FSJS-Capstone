var express = require('express');
var path = require('path');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const createError = require('http-errors');
const methodOverride = require('method-override');
require('dotenv').config();

var indexRouter = require('./routes/index');
var schoolsRouter = require('./routes/schools');

const MONGOLAB_URI  = process.env.MONGOLAB_URI;

var app = express();

//	The port (3000) in the “proxy” line, which goes in the create-react-app's package.json file in the client folder, must match the port that your Express server is running on!
let port = process.env.PORT || 3000;
app.set('port', port);

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
//	This line tells Express(Node.js) to use the provided CSS, Image files. Serve static files from the React app, `express.static` is in charge of sending static files requests to the client. So when the browser requests logo.png from your site, it knows to look in the build folder for that.
app.use(express.static(path.join(__dirname, 'public')));

// Binds the routes to app object, mounts the routes to the express app specifiying '/' as the path.
app.use('/', indexRouter);
app.use('/schools', schoolsRouter);

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
