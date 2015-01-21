var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("tours/oregon-coast", {
		title: "Oregon Coast Tour - "
	});
});

module.exports = router;