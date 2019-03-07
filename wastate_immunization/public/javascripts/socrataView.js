'use strict';


(function (module) {
	/* On server start up immediately check mLab DB for documents,if not there then fetch Socratea data, save to mLab DB. ********/

	const http = require('https');
	const School = require('./database/models').School;
	const SOCRATA_API_KEY = process.env.SOCRATA_API_KEY;


	var socrataView = {};

	socrataView.fetchData = function() {
		const socrata = 'https://data.wa.gov/resource/ndsp-2k9r.json?';
		const url = `${socrata}&$limit=3000&$$app_token=${SOCRATA_API_KEY}`;

		const fetchData = function () {
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
			})};

		// Query checks mLab DB if data is already saved
		let query = School.countDocuments({ }, (err, count) => {
			console.log('COUNT===========================',	count );
			//	--if not, then do fetch data from socrata
			if (!count) {
				console.log('COUNT IS TRUE  Express, data got fetched');
				fetchData();
				// 	--if so, then do not fetch data
			} else {
				console.log(':::::::::::::::::::: COUNT IS FALSE    DB is already populated ::::::::::::');
			}
		});
	}

	module.socrataView = socrataView;

}), (this);
