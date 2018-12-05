'use strict';

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
