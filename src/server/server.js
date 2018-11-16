/***************************************************************/
/*	WIP sandbox experiment			*/
/*				*/
/*				*/
/************************************************************* */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pug = require('pug');

var indexRouter = require('../shared/routes/index');

var app = express();
const port = process.env.PORT || 5000;

// view engine setup
app.set('views', ('src/shared/views'));
console.log('OVER HERE:', __dirname);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//	This line tells the express to use the provided CSS, Image files.  (taken from Project #7)
app.use('/static', express.static('public'));


app.use('/', indexRouter);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'EXPRESS down below:  Its Working@! From /fsjs-capstone-project/server/server.js file' });
	// res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
