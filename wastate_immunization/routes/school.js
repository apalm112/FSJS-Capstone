const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

// Put all API endpoints under '/schools'
router.get('/all', (req, res) => {
	// Find All Schools in the mLab DB Collection:
	// 	There 2248 Schools w/ valid coordinates.
	// There are 347 Schools which have the coordinates as an empty value, i.e.-- {}
	School.find({ 'location_1.coordinates': { $ne: [] }  })
	// School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
		.exec(function(error, schools) {
			var getAllSchoolsCoords = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			console.log('coords.length: ', getAllSchoolsCoords.length);
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
			var allImms = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1]};
			});
			res.send(allImms);
		});
	/*	school_district
			school_name
			school_year
			grade_levels
			k_12_enrollment
			location_1: { coordinates	}
			location_1_address
			location_1_city
			reported
			percent_complete_for_all_immunizations
			percent_exempt_for_diphtheria_tetanus
			percent_exempt_for_hepatitisb
			percent_exempt_for_measles_mumps_rubella
			percent_exempt_for_pertussis
			percent_exempt_for_polio
			percent_exempt_for_varicella
			percent_with_any_exemption
			percent_with_medical_exemption
			percent_with_personal_exemption
			percent_with_religious_exemption
			percent_with_religious_membership_exemption*/
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
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(reportYes);
		});
});

router.get('/reported_no', (req, res) => {
// This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 117.
//	101 HAVE COORDINATES
// 	16 HAVE NO COORDINATES
	School.find({ 'reported': { $eq: 'N' },
		'location_1.coordinates': { $ne: [] } })
		.exec(function(error, schools) {
			// console.log('# of schools: ', schools.length);
			var reportNo = schools.map(curr => {
				var coords = curr.location_1.coordinates;
				return { lng: coords[0], lat: coords[1] };
			});
			res.send(reportNo);
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

module.exports = router;
