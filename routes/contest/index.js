var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render("contest/index", {
		title: "Our Contests - "
	});
});

router.get('/vacation-photos', function (req, res) {
	res.render("contest/vacation-photos", {
		title: "Vacation Photos Contest - "
	});
});




module.exports = router;