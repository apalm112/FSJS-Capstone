const express = require('express');
const router = express.Router();
const http = require('https');

const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;
const School = require('../database/models').School;

/* GET schools listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource, next get School data to display here.');
});



router.get('/fetch', (req, res, next) => {
	var socrata = 'https://data.wa.gov/resource/ndsp-2k9r.json?';
	var url = `${socrata}&$limit=3000&$$app_token=${SOCRATA_API_KEY}`;

	http.get(url, function (res) {
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			var data = JSON.parse(body);
			console.log('# of schools: ', data[0]);

			data.map(function (eachSchool) {
				var school = new School(eachSchool);
				school.save(function(error) {
					if(error) return next(error);
				});
			});
		}).on('error', function (e) {
			console.log('Got an error: ', e);
		});
	});
/*	School.find({ 'school_name': 'VICTOR FALLS ELEMENTARY' })
		.exec(function(error, schools) {
			console.log('MT', schools[0].location_1.coordinates);
			res.send(schools);
		});*/
	res.status(201);
	res.redirect('/');
	// };
})



module.exports = router;
