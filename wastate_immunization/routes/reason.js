const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

// Put all API endpoints under '/schools'
router.get('/medical', (req, res) => {
	// 	There 1621 Schools w/ valid coordinates.
	// There are  Schools which have the coordinates as an empty value, i.e.-- {}
	School.find({ 'percent_with_medical_exemption': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			console.log('coords.length: ', results.length);
			res.send(results);
		});
});

router.get('/personal', (req, res) => {
/*This route displays the results for
	 	Have Coordinates.
		 Total Schools 1958
		 HAVE COORDINATES
		 HAVE NO COORDINATES*/
	School.find({ 'percent_with_personal_exemption': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1]};
			});
			res.send(results);
		});
});

router.get('/religous', (req, res) => {
// This route will display the results for. There are 1067 schools
	School.find({ 'percent_with_religious_exemption': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = eachSchool.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			console.log('# of schools: ', locale.length);
			res.send(locale);
		});
});

router.get('/any_exmption', (req, res) => {
// This route will display the results for. There are 2018
	School.find({ 'percent_with_any_exemption': { $gt: 0},
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = eachSchool.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			console.log('# of schools: ', locale.length);
			res.send(locale);
		});
});

// Not being used.
/*router.get('/personal_exemption_zero', (req, res) => {
// This route will display the results for all schools w/ personal_exemption_zero, there are .   have NO coordinates and  do Have coordinates.
//	This route is creates an array of coordinates for loading cluster markers into the map.
	School.find({
		'number_with_personal_exemption': { $gt: 0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = eachSchool.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(locale);
		});
});

router.get('/personal_exemption_zero/no_coords', (req, res) => {
// This route will display the results for all schools w/ personal_exemption_zero there are 235, AND have NO coordinates, there are 46!
	School.find({
		'number_with_personal_exemption': { $eq: 0.0 },
		'location_1.coordinates': { $eq: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = {
					'address': eachSchool.location_1_address,
					'city': eachSchool.location_1_city
				};
				return coords;
			});
			res.send(locale);
		});
});

router.get('/personal_exemption_zero', (req, res) => {
// This route will display the results for all schools w/ personal_exemption_zero, there are 235.  46 have NO coordinates and 189 do Have coordinates.
//	This route is creates an array of coordinates for loading cluster markers into the map.
	School.find({
		'number_with_personal_exemption': { $eq: 0.0 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = eachSchool.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(locale);
		});
});

router.get('/personal_exemption_zero/no_coords', (req, res) => {
// This route will display the results for all schools w/ personal_exemption_zero there are 235, AND have NO coordinates, there are 46!
	School.find({
		'number_with_personal_exemption': { $eq: 0.0 },
		'location_1.coordinates': { $eq: [] } })
		.exec(function(error, schools) {
			var locale = schools.map(function (eachSchool) {
				var coords = {
					'address': eachSchool.location_1_address,
					'city': eachSchool.location_1_city
				};
				return coords;
			});
			res.send(locale);
		});
});
*/

module.exports = router;
