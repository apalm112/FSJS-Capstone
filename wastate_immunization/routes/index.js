var express = require('express');
var router = express.Router();
const http = require('https');
const path = require('path');

const School = require('../database/models').School;

const MONGOLAB_URI  = process.env.MONGOLAB_URI;
const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;


/* GET home page. */
router.get('/', (req, res) => {
	/*
	This code does not work here.
	TODO: 	** Tried running this code from inside the routes/index.js file, but it would not work.  Only works properly in the server.js file.
	*/
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
	res.send('/index');
	// res.send(path.join(__dirname, 'client', 'public', 'index.html'));
});


module.exports = router;
