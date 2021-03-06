const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

router.get('/all', (req, res) => {
/*	Find All Schools in the mLab DB Collection: There 2248 Schools w/ valid coordinates.
	347 Schools which have the coordinates as an empty value, i.e.-- {}
		schools w/ coordinates Outside of WA state, there are 7 total, are removed.	*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'location_1.coordinates': { $ne: [] }  })
		.exec(function(error, schools) {
			var getAllSchoolsCoords = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var allImms = curr.percent_complete_for_all_immunizations;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var reported = curr.reported;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				if (reported === 'N') {
					allImms = '';
					reported = 'Data Not Reported';
					k_12 = '';
				} else {
					reported = `Reported Immuninzation Rates: ${reported}es`;
					allImms =  `Complete for All Immuninzations: ${allImms}%`;
					k_12 = `${k_12}`;
				}
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: allImms,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12,
					reported: reported
				};
			});
			res.send(getAllSchoolsCoords);
		});
});

router.get('/complete_for_all', (req, res) => {
/*This route displays the results for all schools w/ which have:
		100% complete for all immunizations, 65 have coordinates. */
	School.find({ 'percent_complete_for_all_immunizations': { $eq: 100 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map((curr) => {
				var coords = curr.location_1.coordinates;
				var allImms = curr.percent_complete_for_all_immunizations;
				var name = curr.school_name;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var district = curr.school_district;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				var reported = '';
				allImms =  `Complete for All Immuninzations: ${allImms}%`;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: allImms,
					reported: reported,
					name: name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: k_12
				};
			});
			res.send(results);
		});
});

router.get('/reported_yes', (req, res) => {
/* This route will display the results for all schools w/ which did report immunizations & have coordinates, there are 2140 Total.	*/
	School.remove({ 'location_1.coordinates': { $nin: [ -70.994001, -83.290819, -89.627144, -98.736722, -111.447261, -118.257991, -121.810542 ] }})
		.find({ 'reported': { $eq: 'Y' },
			'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var reportYes = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var name = curr.school_name;
				var district = curr.school_district;
				var reported = curr.reported;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				k_12 = `${k_12}`;
				return {
					lng: coords[0],
					lat: coords[1],
					address: address,
					city: city,
					specificRouteData: `Reported Immuninzation Rates: ${reported}es`,
					district: district,
					name:name,
					levels: grade_levels,
					k12: k_12,
					reported: ''
				};
			});
			res.send(reportYes);
		});
});

router.get('/reported_no', (req, res) => {
/*	This route will display the results for all schools w/ which did not report immunizations, there are 101 that have coordinates.	*/
	School.find({ 'reported': { $eq: 'N' },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var name = curr.school_name;
				var district = curr.school_district;
				var reported = '';
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var grade_levels = curr.grade_levels;
				return {
					lng: coords[0],
					lat: coords[1],
					specificRouteData: 'Data Not Reported',
					name:name,
					address: address,
					city: city,
					district: district,
					levels: grade_levels,
					k12: 'N/A',
					reported: reported
				};
			});
			res.send(results);
		});
});

module.exports = router;
