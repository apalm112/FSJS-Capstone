var express = require('express');
var router = express.Router();
var app = require('../App');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
		title: 'Panda Time Express',
		intro: 'This is teh start of muh Treehouse FSJS Capstone Project: BookMarks',
		app  // Needs React hydrate, BrowserRouter, etc to work.
	});
});

module.exports = router;
