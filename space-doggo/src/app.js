import fetch from 'isomorphic-fetch';
import GOOGLE_BOOKS_KEY from './config/keys'

// const science = require('./data/auth/science.json');

/*const getIsbn = () => {
	science.map((curr, idx) => {
		console.log(curr.results.book_details.primary_isbn13);
	});
}

getIsbn()
*/

/*	TODO:
/*				Write a fetch(GoogleBookURL) function here to
/*		return the cover image for rendering.
/*																			 */

const GoogleBookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;

var isbn13Placeholder = [ 9780393609394 ];
/* FETCH HELPER FUNCTIONS: ************************************************************/
function validateStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}
function readResponseAsJSON(response) {
	// console.dir(response.body);
	return response.json();	// The important line, holds the fetched data.
}
function manipulateImages(results) {
	results = results.items 	// Manipulates the fetched data. NYT=results.results,GOOGLE=results.items
	// BUG: TypeError: Cannot read property 'map' of undefined at manipulateImages:
	// console.log('MANIPULATE IMAGES:   RESULTS==================================:', results);
	var newResults = results.map(curr => curr.volumeInfo.imageLinks.thumbnail);
	// console.log('MANIPULATE IMAGES:   NEW RESULTS==================================:', newResults);
	return newResults;
}
function logError(error) {
	console.warn('Request Failed', error);
	return null;
}
/* END FETCH HELPER FUNCTIONS: **************************************/
/* FETCH GOOGLE BOOKS API FOR COVER IMAGE****************************/
export function fetchGoolgeBookImg() {
	const encodedURI = encodeURI(`${GoogleBookURL}${isbn13Placeholder}&key=${GOOGLE_BOOKS_KEY}`);
	return fetch(encodedURI, { mode: 'cors' })
		.then(validateStatus)
		.then(readResponseAsJSON)
		.then(manipulateImages)
		.then(results => {
			var potato = results
			return  potato; })
		.catch(logError);
}
