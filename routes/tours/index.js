var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("tours/index", {
		title: "TOURS - "
	});
});

router.get('/hood-river', function(req, res) {
	res.render("tours/hood-river", {
		title: "Hood River Tours - "
	});
});

router.get('/oregon-coast', function(req, res) {
	res.render("tours/oregon-coast", {
		title: "Oregon Coast Tours - "
	});
});
router.get('/', function(req, res) {
	res.render("tours/request-group-rate", {
		title: "Request Group Rate - "
	});
});

module.exports = router;