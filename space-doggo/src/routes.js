'use strict';
// require modules
const express = require('express');
const router = express.Router();
const axios = require('axios');

// require database models
const BestSeller = require('./database/models');

// When a User makes a request to the `GET /` route, book documents are returned.
router.get('/data/auth/science/', (req, res) => {
/*	BestSeller.find({})
		.exec(function(error, books) {
			res.json(books);
		});
	*/
	//==============================================================
	const science = require('./src/data/auth/science.json');
	var potato = [];
	science.map((curr, idx) => {
		potato.push(curr.num_results);
		potato.push(curr.last_modified);
		potato.push(curr.results.list_name);
		potato.push(curr.results.bestsellers_date);
		potato.push(curr.results.books[idx].rank);
		potato.push(curr.results.books[idx].primary_isbn13);
		potato.push(curr.results.books[idx].description);
		potato.push(curr.results.books[idx].title);
		potato.push(curr.results.books[idx].author);
		potato.push(curr.results.books[idx].book_image);
		potato.push(curr.results.books[idx].amazon_product_url);
		// console.log(bookArr[0].books[4]);
		return potato;
	});
	console.log('===========================', potato);
	//==============================================================
});

// Creates a book, sets the Location header to "/", and returns no content.
router.post('/', (req, res, next) => {
	var book = new BestSeller(req.body);
	console.log('=================================', book);
	book.save(function(error) {
		if(error) return next(error);
		res.redirect('/');
		res.status(201);
	});
});
