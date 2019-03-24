const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

router.get('/all', (req, res) => {
	// Find All Schools in the mLab DB Collection: There 2248 Schools w/ valid coordinates.
	// 347 Schools which have the coordinates as an empty value, i.e.-- {}
	School.find({ 'location_1.coordinates': { $ne: [] }  })
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
				// if (!k_12) { k_12 = 'Not reported'; }
				if (reported === 'N') {
					allImms = '';
					reported = 'Data Not Reported';
					k_12 = '';
				} else {
					reported = `Reported Immuninzation Rates: ${reported}es`;
					allImms =  `Complete for All Immuninzations: ${allImms}%`;
					k_12 = `K-12 Enrollment: ${k_12}`;
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
		100% complete for all immunizations
	 	Have Coordinates.
		74 Total Schools
		65 HAVE COORDINATES
		 9 HAVE NO COORDINATES*/
	School.find({ 'percent_complete_for_all_immunizations': { $eq: 100 },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
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
				k_12 = `K-12 Enrollment: ${k_12}`;
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
// This route will display the results for all schools w/ which DID REPORT immunizations && Have Coordinates.
//	 there are 2478 Total.
//	2147 HAVE COORDINATES
//		^-- 7 which have the wrong coordinates, they are placed outside of WA state.
// TODO:  Remove those 7 schools from the search results.
// 	 331 HAVE NO COORDINATES
	School.find({ 'reported': { $eq: 'Y' },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			var reportYes = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var name = curr.school_name;
				var district = curr.school_district;
				var reported = curr.reported;
				var address = curr.location_1_address;
				var city = curr.location_1_city;
				var grade_levels = curr.grade_levels;
				var k_12 = curr.k_12_enrollment;
				return {
					lng: coords[0],
					lat: coords[1],
					address: address,
					city: city,
					specificRouteData: `Reported Immuninzation Rates: ${reported}es`,
					district: district,
					name:name,
					levels: grade_levels,
					k12: k_12
				};
			});
			res.send(reportYes);
		});
});

router.get('/reported_no', (req, res) => {
// This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 117 BUT:
//	101 HAVE COORDINATES
// 	16 HAVE NO COORDINATES
	School.find({ 'reported': { $eq: 'N' },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			var results = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				var name = curr.school_name;
				var district = curr.school_district;
				var reported = curr.reported;
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
					k12: '',  // reported_no schools seems to not have this data.
					reported: ''
				};
			});
			res.send(results);
		});
});

router.get('/coords/no', (req, res) => {
// This route will display the results for all schools w/ NO COORDINATES. There are 347
	School.find({ 'location_1.coordinates': { $eq: [] } })
		.exec(function(error, schools) {
			console.log('# of schools: ', schools.length);
			res.send(schools);
		});
});

router.get('/elma', (req, res) => {
// This route will display the results for "VICTOR FALLS ELEMENTARY".
//	Which DOES NOT HAVE COORDINATES.
	School.find({ 'school_name': 'MARY M KNIGHT HIGH SCHOOL' })
		.exec(function(error, schools) {
			console.log('XXXXXXXXX', schools[0]);
			res.json(schools);
		});
});

/*
router.get('/schools/desert', (req, res) => {
// This route will display the results for "DESERT HILLS MIDDLE SCHOOL"
//	Which HAS COORDINATES.
	School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
		.exec(function(error, schools) {
			console.log(schools);
			res.json(schools[0].location_1.coordinates);
		});
});*/

module.exports = router;