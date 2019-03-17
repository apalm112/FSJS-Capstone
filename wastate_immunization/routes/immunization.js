const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

/* GET immunizations routes. */

/*router.get(`/${param}`, (req, res) => {
	// This route could programatically display the percentage_exempt_for_${param} > 0
	// Where the param is passed in AND must be in the '_param_underscore' format!
	// TODO: Figure how to pass the route param.
	School.find({
		`percent_exempt_for_${param}`: { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});*/

router.get('/hebatitis_b', (req, res) => {
	// This route will display the percentage_exempt_for_hepatitis_b > 0
	// There are 1972 schools from this query.
	//	 Have coordinates
	School.find({
		'percent_exempt_for_hepatitisb': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

router.get('/measles', (req, res) => {
	// This route will display the percent_exempt_for_measles_mumps_rubella. > 0
	// There are 2253 schools from this query.
	//	1975 Have coordinates
	School.find({
		'percent_exempt_for_measles_mumps_rubella': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

router.get('/pertussis', (req, res) => {
	// This route will display the percent_exempt_for_pertussis percent_exempt_for_pertussis > 0
	// There are  schools from this query.
	//	1946 Have coordinates
	School.find({
		'percent_exempt_for_pertussis': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

router.get('/polio', (req, res) => {
	// This route will display the percent_exempt_for_polio > 0
	// There are  schools from this query.
	//	1957 Have coordinates
	School.find({
		'percent_exempt_for_polio': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

router.get('/tetanus', (req, res) => {
	// This route will display the percent_exempt_for_diphtheria_tetanus > 0
	// There are  schools from this query.
	//	1968 Have coordinates
	School.find({
		'percent_exempt_for_diphtheria_tetanus': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

router.get('/varicella', (req, res) => {
	// This route will display the percent_exempt_for_diphtheria_tetanus > 0
	// There are  schools from this query.
	//	1992 Have coordinates
	School.find({
		'percent_exempt_for_varicella': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(results);
		});
});

module.exports = router;
