var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("tours/request-group-rate", {
		title: "Request Group Rate - "
	});
});

module.exports = router;