var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
// Function checks mLab DB if data is already there,
// 		--if so, then do not fetch data
	// let query = School.countDocuments();
	// if (!query > 2594) {
	// 	//		--if not, then do fetch data from socrata
	//
	// }
	// 	.exec(function(error, schools) {
	// 		res.json(schools);
	// 	});







  res.render('index', { title: 'Express' });
});





module.exports = router;
