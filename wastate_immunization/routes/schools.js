const express = require('express');
const router = express.Router();

const School = require('../database/models').School;

/* GET schools listing. */
router.get('/schools', function(req, res, next) {
	res.send('respond with a resource, next get School data to display here.');
});

router.get('/schools/desert', (req, res, next) => {
// This route will display the results for "DESERT HILLS MIDDLE SCHOOL"
//	Which HAS COORDINATES.
	School.find({ 'school_name': 'DESERT HILLS MIDDLE SCHOOL' })
		.exec(function(error, schools) {
			console.log(schools);
			res.json(schools[0].location_1.coordinates);
		});
});


module.exports = router;
