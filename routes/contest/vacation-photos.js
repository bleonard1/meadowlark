var express = require('express');
var router = express.Router();

// router.get('contest', function(req, res) {
// 	res.render("vacation-photos", {
// 		title: "Vacay Photo Contest - "
// 	});
// });

router.get('contest', function(req, res) {
	
	var now = new Date();
	res.render('vacation-photos',{
		title: "Vacay Photo Contest - ",
		year: now.getFullYear(),
		month: now.getMont()
	});
	
});

module.exports = router;