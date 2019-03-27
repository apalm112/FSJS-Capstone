const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

// Put all API endpoints under '/schools'
router.get('/medical', (req, res) => {
	// 	There 1621 Schools w/ valid coordinates.
	// There are  Schools which have the coordinates as an empty value, i.e.-- {}
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'percent_with_medical_exemption': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptMedical = curr.percent_with_medical_exemption;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_with_medical_exemption;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students w/ Medical Exemption: ${reported}`;
				exemptMedical = `${exemptMedical}% w/ Medical Exemption`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptMedical,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12,
					reported: reported
				};
			});
			res.send(results);
		});
});

router.get('/personal', (req, res) => {
/*This route displays the results for
	 	Have Coordinates.
		 Total Schools 1958
		 HAVE COORDINATES
		 HAVE NO COORDINATES*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'percent_with_personal_exemption': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptPersonal = curr.percent_with_personal_exemption;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_with_personal_exemption;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students w/ Personal Exemption: ${reported}`;
				exemptPersonal = `${exemptPersonal}% w/ Personal Exemption`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptPersonal,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12,
					reported: reported
				};
			});
			res.send(results);
		});
});

router.get('/religous', (req, res) => {
// This route will display the results for. There are 1067 schools
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'percent_with_religious_exemption': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptReligulous = curr.percent_with_religious_exemption;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_with_religious_exemption;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students w/ Religious Exemption: ${reported}`;
				exemptReligulous = `${exemptReligulous}% w/ Religious Exemption`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptReligulous,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12,
					reported: reported
				};
			});
			res.send(results);
		});
});

router.get('/any_exmption', (req, res) => {
// This route will display the results for. There are 2018
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'percent_with_any_exemption': { $gt: 0},
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptAny = curr.percent_with_any_exemption;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_with_any_exemption;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students w/ Any Exemption: ${reported}`;
				exemptAny = `${exemptAny}% w/ Any Exemption`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptAny,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12,
					reported: reported
				};
			});
			res.send(results);
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
