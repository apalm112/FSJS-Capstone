var express = require('express');
var router = express.Router();
const http = require('https');

const School = require('../database/models').School;

const MONGOLAB_URI  = process.env.MONGOLAB_URI;
const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;


/* GET home page. */
router.get('/api/node_express_send_data_to_react-app', function(req, res) {
	res.json({ express: '// WARNING: // WARNING: // WARNING: ' });



	/* Validate mLab Schools collection if it's already populated or not.***********************
	This code does not work here.
	*/
/*	const socrataView = {};

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
						if(error) return next(error);
					});
				});
			}).on('error', (e) => {
				console.log('Got an error: ', e);
			});
		})
	};	// end socrataView.fetchAll()

	socrataView.checkMLabDBForData = function () {
		// Query checks mLab DB if data is already saved
		let query = School.countDocuments({ }, (err, count) => {
			console.log('COUNT===========================',	count );
			//	--if not, then do fetch data from socrata
			if (!count) {
				console.log('COUNT IS TRUE  Express, data got fetched');
				socrataView.fetchAll();
				// 	--if so, then do not fetch data
			} else {
				console.log(':::::::::::::::::::: COUNT IS FALSE    DB is already populated ::::::::::::');
			}
		});
	};
socrataView.checkMLabDBForData();
*/
	// res.render('index', { title: 'Express' });
});


module.exports = router;
