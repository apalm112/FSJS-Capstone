const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

router.get('/hepatitis_b', (req, res) => {
/*	This route will display the percentage_exempt_for_hepatitis_b > 0
		There are 1972 schools
		1967 have valid coordinates			*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_hepatitisb': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptHepB = curr.percent_exempt_for_hepatitisb;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_hepatitisb;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Hepatitis B: ${reported}`;
				exemptHepB =  `${exemptHepB}% Exempt for Hepatitis B`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptHepB,
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

router.get('/measles', (req, res) => {
/*	This route will display the percent_exempt_for_measles_mumps_rubella > 0
		There are 2253 schools
		1970 have valid coordinates		*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_measles_mumps_rubella': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptMeasles = curr.percent_exempt_for_measles_mumps_rubella;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_measles_mumps_rubella;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Measles, Mumps, Rubella: ${reported}`;
				exemptMeasles =  `${exemptMeasles}% Exempt for Measles, Mumps, Rubella`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptMeasles,
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

router.get('/pertussis', (req, res) => {
/*	This route will display the percent_exempt_for_pertussis > 0
		There are  schools from this query
		1940 have valid coordinates		*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_pertussis': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptPertussis = curr.percent_exempt_for_pertussis;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_pertussis;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Pertussis: ${reported}`;
				exemptPertussis =  `${exemptPertussis}% Exempt for Pertussis`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptPertussis,
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

router.get('/polio', (req, res) => {
/*	This route will display the percent_exempt_for_polio > 0
		There are  schools from this query.
		1952 have valid coordinates*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_polio': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptPolio = curr.percent_exempt_for_polio;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_polio;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Polio: ${reported}`;
				exemptPolio =  `${exemptPolio}% Exempt for Polio`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptPolio,
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

router.get('/tetanus', (req, res) => {
/*	This route will display the percent_exempt_for_diphtheria_tetanus > 0
		1962 have valid coordinates		*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_diphtheria_tetanus': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptTetanus = curr.percent_exempt_for_diphtheria_tetanus;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_diphtheria_tetanus;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Tetanus: ${reported}`;
				exemptTetanus = `${exemptTetanus}% Exempt for Tetanus`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptTetanus,
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

router.get('/varicella', (req, res) => {
/*	This route will display the percent_exempt_for_diphtheria_tetanus > 0
		1987 have valid coordinates		*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({
			'percent_exempt_for_varicella': { $gt: 0 },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var exemptVaricella = curr.percent_exempt_for_varicella;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.number_exempt_for_varicella;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				reported = `Number of Students Exempt for Varicella: ${reported}`;
				exemptVaricella = `${exemptVaricella}% Exempt for Varicella`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: exemptVaricella,
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

module.exports = router;
